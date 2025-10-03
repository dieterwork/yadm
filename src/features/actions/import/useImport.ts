import type { DEMOEdge } from "$/features/edges/edges.types";
import { setEdges, setNodes } from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactFlowJsonObject } from "@xyflow/react";
import { useEffect, useRef, type ChangeEvent, type RefObject } from "react";

const useImport = () => {
  const input = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    input.current = document.createElement("input");
    input.current.type = "file";
    const onChange = (e: Event) => {
      if (!e.target) return;
      const target = e.target as HTMLInputElement;
      const [file] = target.files ?? [];
      if (!file) return;
      if (file.type !== "application/json")
        throw new Error("Invalid file type");
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
    if (input.current) {
      input.current.addEventListener("change", onChange);
    }
    return () => {
      if (input.current) {
        input.current.removeEventListener("change", onChange);
        input.current.remove();
        input.current = null;
      }
    };
  }, [setNodes, setEdges]);
  const importJSON = () => {
    if (!input.current) return;
    input.current.click();
  };
  return { importJSON };
};

export default useImport;
