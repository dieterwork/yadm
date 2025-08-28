import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
} from "react-aria-components";
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
      setViewport: state.setViewport,
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
      <MenuTrigger>
        <Button>File</Button>
        <Popover>
          <Menu className="bg-white">
            <MenuItem
              onAction={() => {
                setModelFromJSONObject({
                  edges: [],
                  nodes: [],
                  viewport: { x: 0, y: 0, zoom: 1 },
                });
              }}
            >
              New
            </MenuItem>
            <MenuItem
              onAction={() => {
                saveDEMOInstance(DEMOInstance);
              }}
            >
              Save
            </MenuItem>

            <MenuItem
              onAction={() => {
                importJSON(inputRef);
              }}
            >
              Import JSON
            </MenuItem>
            <SubmenuTrigger>
              <MenuItem>Export as</MenuItem>
              <Popover>
                <Menu>
                  <MenuItem
                    onAction={() => {
                      exportAsJSON(DEMOInstance, fileName);
                    }}
                  >
                    JSON
                  </MenuItem>
                  <MenuItem>PNG</MenuItem>
                  <MenuItem>PDF</MenuItem>
                </Menu>
              </Popover>
            </SubmenuTrigger>
            <MenuItem>Exit</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </>
  );
};

export default FileMenu;
