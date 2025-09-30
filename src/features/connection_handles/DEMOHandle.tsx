import {
  getConnectedEdges,
  Handle,
  useUpdateNodeInternals,
  type HandleProps,
} from "@xyflow/react";
import {
  getNode,
  setEdges,
  setNodes,
  updateNodeHandles,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useEffect } from "react";

let didInit = false;
const DEMOHandle = ({
  id,
  nodeId,
  position,
  ...restProps
}: HandleProps & { nodeId: string }) => {
  const node = getNode(nodeId);
  const edges = useDEMOModelerStore((state) => state.edges);
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
              (node) => !targetNodes.includes(node.id) && node.type !== "ghost"
            )
          );
        }

        updateNodeHandles(nodeId, position, (handles) =>
          handles.filter((handle) => handle.id !== id)
        );
        updateNodeInternals(nodeId);
      }}
    />
  );
};

export default DEMOHandle;
