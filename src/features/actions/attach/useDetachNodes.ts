import { useReactFlow } from "@xyflow/react";
import { useDEMOModeler } from "../../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";

export const useDetachNodes = () => {
  const { getInternalNode } = useReactFlow();
  const setNodes = useDEMOModeler((state) => state.setNodes);

  const detachNodes = (ids: string[], removeParentId?: string) => {
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

  return detachNodes;
};

export default useDetachNodes;
