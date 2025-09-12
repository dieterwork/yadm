import { useDEMOModeler } from "../../modeler/useDEMOModeler";
import { sortNodes } from "../../../shared/utils/sortNodes";

/** Attach node as a child to another node */

export const useAttachNodes = () => {
  const setNodes = useDEMOModeler((state) => state.setNodes);
  const isAttaching = useDEMOModeler((state) => state.attach.isAttaching);

  const attachNodes = (
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

  return attachNodes;
};
