import {
  setAction,
  updateNode,
  updateNodeEditable,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useEffect } from "react";

const useEditableContentShortcut = () => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const editableNodes = nodes.filter(
    (node) => "isEditable" in node.data && node.data.isEditable
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (editableNodes.length === 0) return;
      for (const node of editableNodes) {
        updateNodeEditable(node.id, false);
        updateNode(node.id, { draggable: true, selected: true });
        setAction("pan");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editableNodes, updateNodeEditable, updateNode]);
};
export default useEditableContentShortcut;
