import { useShallow } from "zustand/react/shallow";
import type {
  Edge,
  ReactFlowInstance,
  ReactFlowJsonObject,
} from "@xyflow/react";
import { useRef, type RefObject } from "react";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";
import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  clearModel,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { saveDEMOInstance } from "$/features/save/saveDEMOInstance";

const exportAsJSON = (
  instance: ReactFlowInstance<DEMONode, Edge> | null,
  fileName: string
) => {
  if (!instance) return;
  const jsonModel = JSON.stringify(instance.toObject());
  const file = new Blob([jsonModel], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(file);
  link.style.display = "none";
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();

  // cleanup
  URL.revokeObjectURL(url);
  link.remove();
};

const importJSON = (ref: RefObject<HTMLInputElement>) => {
  const input = ref.current;
  if (!input) return;
  input.click();
};

const FileMenu = () => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { DEMOInstance, fileName } = useDEMOModelerStore(
    useShallow((state) => ({
      DEMOInstance: state.DEMOInstance,
      fileName: state.fileName,
    }))
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.target.files ?? [];
    if (!file) return;
    if (file.type !== "application/json") throw new Error("Invalid file type");
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result || reader.result instanceof ArrayBuffer) return;
      const demoModel: ReactFlowJsonObject<DEMONode, DEMOEdge> = JSON.parse(
        reader.result
      );
      if (!demoModel.nodes || !demoModel.edges)
        throw new Error("Invalid JSON file");
      setNodes(demoModel.nodes);
      setEdges(demoModel.edges);
    };
    reader.onerror = () => {
      throw new Error("Error reading file");
    };
    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleInputChange}
      />
      <TopbarMenuButton label="File">
        <TopbarMenuItem
          onAction={() => {
            clearModel();
            localStorage.removeItem("demo-model");
          }}
        >
          New
        </TopbarMenuItem>
        <TopbarMenuItem
          onAction={() => {
            saveDEMOInstance(DEMOInstance);
          }}
        >
          Save
        </TopbarMenuItem>

        <TopbarMenuItem
          onAction={() => {
            importJSON(inputRef);
          }}
        >
          Import JSON
        </TopbarMenuItem>
        <TopbarSubMenuButton label="Export as">
          <TopbarMenuItem
            onAction={() => {
              exportAsJSON(DEMOInstance, fileName);
            }}
          >
            JSON
          </TopbarMenuItem>
          <TopbarMenuItem>PNG</TopbarMenuItem>
          <TopbarMenuItem>PDF</TopbarMenuItem>
        </TopbarSubMenuButton>
        <TopbarMenuItem>Exit</TopbarMenuItem>
      </TopbarMenuButton>
    </>
  );
};

export default FileMenu;
