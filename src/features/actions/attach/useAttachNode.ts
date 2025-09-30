import {
  setNodes,
  useDEMOModelerStore,
} from "../../modeler/useDEMOModelerStore";
import { sortNodes } from "../../../shared/utils/sortNodes";
import { useReactFlow } from "@xyflow/react";

/** Attach node as a child to another node */

export const useAttachNode = () => {
  const { getInternalNode } = useReactFlow();

  const attachNode = (
    childNodeIds: string[],
    parentNodeId: string,
    extant: "parent" | [[number, number], [number, number]]
  ) => {
    setNodes((nodes) => {
      const nextNodes = nodes
        .map((node) => {
          if (!childNodeIds.includes(node.id)) return node;

          return {
            ...node,
            parentId: parentNodeId,
            extant,
          };
        })
        .sort(sortNodes);
      return nextNodes;
    });
  };

  const detachNode = (ids: string[], removeParentId?: string) => {
    setNodes((nodes) => {
      const nextNodes = nodes.map((node) => {
        if (ids.includes(node.id) && node.parentId) {
          const parentNode = getInternalNode(node.parentId);

          return {
            ...node,
            position: {
              x:
                node.position.x +
                (parentNode?.internals.positionAbsolute.x ?? 0),
              y:
                node.position.y +
                (parentNode?.internals.positionAbsolute.y ?? 0),
            },
            expandParent: undefined,
            parentId: undefined,
            extent: undefined,
          };
        }
        return node;
      });

      return nextNodes.filter(
        (node) => !removeParentId || node.id !== removeParentId
      );
    });
  };

  return { attachNode, detachNode };
};

export default useAttachNode;
