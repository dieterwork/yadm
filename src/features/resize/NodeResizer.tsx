import { useShallow } from "zustand/react/shallow";
import { useDEMOModeler } from "../modeler/useDEMOModeler";

const NodeResizer = () => {
  const { getNode, getChildrenNodes, updateNodeExtent } = useDEMOModeler(
    useShallow((state) => ({
      getNode: state.getNode,
      getChildrenNodes: state.getChildrenNodes,
      updateNodeExtent: state.updateNodeExtent,
    }))
  );

  const changeChildExtent = () => {
    const parentNode = getNode(id);
    const childrenNodes = getChildrenNodes(id);

    for (const child of childrenNodes) {
      if (!child || !child?.extent || child?.extent === "parent") return;
      updateNodeExtent(child.id, [
        [12.5, 12.5],
        [parentNode.width - 12.5, parentNode.height - 12.5],
      ]);
    }
  };
};
export default NodeResizer;
