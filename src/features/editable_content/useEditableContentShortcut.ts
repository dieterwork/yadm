import {
  updateNode,
  updateNodeEditable,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import useShortcut from "../keyboard/useShortcut";

const useEditableContentShortcut = () => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const [editableNode] = nodes.filter((node) => node.data.isEditable);
  useShortcut("Escape", () => {
    if (!editableNode) return;
    updateNodeEditable(editableNode.id, false);
    updateNode(editableNode.id, { selected: false });
  });
};
export default useEditableContentShortcut;
