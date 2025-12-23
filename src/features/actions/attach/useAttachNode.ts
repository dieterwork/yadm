import { getNode, setNodes } from "../../modeler/useDEMOModelerStore";
import { sortNodes } from "../../../shared/utils/sortNodes";
import convertAbsoluteToRelativePosition from "$/features/nodes/utils/convertAbsoluteToRelativePosition";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";

/** Attach node as a child to another node */

export const useAttachNode = () => {
  const attachNode = (
    nodeIds: string[],
    parentNodeId: string,
    extant?: "parent" | [[number, number], [number, number]]
  ) => {
    setNodes((nodes) => {
      const nextNodes = nodes.map((node) => {
        if (!nodeIds.includes(node.id)) return node;

        const parentNode = getNode(parentNodeId);
        const newPosition = convertAbsoluteToRelativePosition(
          node.position,
          parentNode,
          nodes,
          true
        );

        return {
          ...node,
          parentId: parentNodeId,
          extant,
          position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
        };
      });
      const sortedNodes = nextNodes.sort((a, b) => sortNodes(a, b, nextNodes));
      return sortedNodes;
    });
  };

  const detachNode = (ids: string[], removeParentId?: string) => {
    setNodes((nodes) => {
      const nextNodes = nodes
        .map((node) => {
          if (!ids.includes(node.id) || !node.parentId) return node;
          const newPosition = convertRelativeToAbsolutePosition(
            node.position,
            node,
            nodes
          );
          return {
            ...node,
            position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
            expandParent: undefined,
            parentId: undefined,
            extent: undefined,
          };
        })
        .filter((node) => node.id !== removeParentId)
        .sort((a, b) => sortNodes(a, b, nodes));
      return nextNodes;
    });
  };

  return { attachNode, detachNode };
};

export default useAttachNode;
