import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  getNode,
  setEdges,
  setNodes,
  updateNodeHandles,
} from "$/features/modeler/store/useDEMOModelerStore";
import { getConnectedEdges, Position } from "@xyflow/react";

const deleteHandle = (
  id: string,
  position: Position,
  nodeId: string,
  edges: DEMOEdge[],
  updateNodeInternals: (nodeId: string | string[]) => void,
) => {
  const node = getNode(nodeId);
  if (!node) {
    throw new Error("Node not found");
  }
  const connectedEdges = getConnectedEdges([node], edges).filter((edge) => {
    return edge.sourceHandle === id || edge.targetHandle === id;
  });

  const targetNodes = connectedEdges.map((edge) => edge.target);

  setEdges((edges) => edges.filter((edge) => !connectedEdges.includes(edge)));

  setNodes((nodes) =>
    nodes.filter(
      (node) => !(targetNodes.includes(node.id) && node.type === "ghost"),
    ),
  );

  updateNodeHandles(nodeId, position, (handles) =>
    handles.filter((handle) => handle.id !== id),
  );
  updateNodeInternals(nodeId);
};

export default deleteHandle;
