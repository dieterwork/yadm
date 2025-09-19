import { useDEMOModeler } from "../../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import type { DEMONode } from "../../nodes/nodes.types";
import type {
  Edge,
  ReactFlowInstance,
  ReactFlowJsonObject,
} from "@xyflow/react";
import { useRef, type RefObject } from "react";
import { saveDEMOInstance } from "../../save/saveDEMOInstance";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";

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
  const { DEMOInstance, fileName, setModelFromJSONObject } = useDEMOModeler(
    useShallow((state) => ({
      DEMOInstance: state.DEMOInstance,
      id: state.id,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setModelFromJSONObject: state.setModelFromJSONObject,
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
      const demoModel: ReactFlowJsonObject<DEMONode, Edge> = JSON.parse(
        reader.result
      );
      setModelFromJSONObject(demoModel);
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
            setModelFromJSONObject({
              edges: [],
              nodes: [],
              viewport: { x: 0, y: 0, zoom: 1 },
            });
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
