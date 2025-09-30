import {
  getEdge,
  setEdges,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { reconnectEdge, useInternalNode } from "@xyflow/react";
import { DEMOEdge } from "../edges.types";

const useSwapConnection = ({
  edgeId,
  sourceNodeId,
  targetNodeId,
}: {
  edgeId: string;
  sourceNodeId: string;
  targetNodeId: string;
}) => {
  const sourceNode = useInternalNode<DEMONode>(sourceNodeId);
  const targetNode = useInternalNode<DEMONode>(targetNodeId);
  const edge = getEdge(edgeId);
  const edges = useDEMOModelerStore((state) => state.edges);
  const swapConnection = () => {
    if (
      !edge ||
      !edge.sourceHandle ||
      !edge.targetHandle ||
      !sourceNode ||
      !targetNode
    )
      return;
    const newEdges = reconnectEdge<DEMOEdge>(
      edge,
      {
        source: targetNodeId,
        target: sourceNodeId,
        sourceHandle: edge.targetHandle,
        targetHandle: edge.sourceHandle,
      },
      edges
    );
    setEdges(newEdges);
  };
  return swapConnection;
};

export default useSwapConnection;
