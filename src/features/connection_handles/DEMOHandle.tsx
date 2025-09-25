import {
  getConnectedEdges,
  Handle,
  useUpdateNodeInternals,
  type HandleProps,
} from "@xyflow/react";
import { getNode, useDEMOModeler } from "../modeler/useDEMOModeler";
import { useEffect } from "react";

let didInit = false;
const DEMOHandle = ({
  id,
  nodeId,
  position,
  ...restProps
}: HandleProps & { nodeId: string }) => {
  const node = getNode(nodeId);
  const updateNodeHandles = useDEMOModeler((state) => state.updateNodeHandles);
  const edges = useDEMOModeler((state) => state.edges);
  const setEdges = useDEMOModeler((state) => state.setEdges);
  const setNodes = useDEMOModeler((state) => state.setNodes);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (!didInit) {
      updateNodeInternals(nodeId);
    }
  }, []);

  return (
    <Handle
      {...restProps}
      className="demo-handle"
      id={id}
      position={position}
      onContextMenu={(e) => {
        e.preventDefault();
        const connectedEdges = getConnectedEdges([node], edges).filter(
          (edge) => {
            edge.sourceHandle === id || edge.targetHandle === id;
          }
        );

        const targetNodes = connectedEdges.map((edge) => edge.target);

        if (connectedEdges) {
          setEdges((edges) =>
            edges.filter((edge) => !connectedEdges.includes(edge))
          );
        }

        if (targetNodes) {
          setNodes((nodes) =>
            nodes.filter(
              (node) => !targetNodes.includes(node) && node.type !== "ghost"
            )
          );
        }

        updateNodeHandles(nodeId, (handles) => ({
          ...handles,
          [position]: {
            ...handles[position],
            handles: handles[position]?.handles?.filter(
              (handle) => handle.id !== id
            ),
          },
        }));
        updateNodeInternals(nodeId);
      }}
    />
  );
};

export default DEMOHandle;
