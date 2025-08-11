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

const save = (instance: ReactFlowInstance<DEMONode<string>, Edge> | null) => {
  if (!instance) return;
  const jsonModel = JSON.stringify(instance.toObject());
  localStorage.setItem("demo-model", jsonModel);
};

const exportAsJSON = (
  instance: ReactFlowInstance<DEMONode<string>, Edge> | null,
  id: string
) => {
  if (!instance) return;
  const jsonModel = JSON.stringify(instance.toObject());
  const file = new Blob([jsonModel], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(file);
  link.style.display = "none";
  link.href = url;
  link.download = `DEMO-model-${id}.json`;
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
  const { DEMOInstance, id, setModelFromJSONObject } = useDEMOModeler(
    useShallow((state) => ({
      DEMOInstance: state.DEMOInstance,
      id: state.id,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setViewport: state.setViewport,
      setModelFromJSONObject: state.setModelFromJSONObject,
    }))
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.target.files ?? [];
    if (!file) return;
    if (file.type !== "application/json") throw new Error("Invalid file type");
    const reader = new FileReader();
    reader.onload = () => {
      const demoModel: ReactFlowJsonObject<DEMONode<string>, Edge> = JSON.parse(
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
            <MenuItem>New</MenuItem>
            <MenuItem
              onAction={() => {
                save(DEMOInstance);
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
                      exportAsJSON(DEMOInstance, id);
                    }}
                  >
                    JSON
                  </MenuItem>
                  <MenuItem>PNG</MenuItem>
                  <MenuItem>PDF</MenuItem>
                </Menu>
              </Popover>
            </SubmenuTrigger>
            <MenuItem>Delete diagram</MenuItem>
            <MenuItem>Exit</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </>
  );
};

export default FileMenu;
