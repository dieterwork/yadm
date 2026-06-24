import {
  getEdge,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { reconnectEdge, useInternalNode } from "@xyflow/react";
import type { DEMOEdge } from "../edges.types";
import getNodeHandle from "$/features/connection_handles/utils/getHandle";

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
  const edges = useDEMOModelerStore((state) => state.edges);
  const edge = getEdge(edgeId);
  const sourceHandle = getNodeHandle(sourceNode, edge?.sourceHandle);
  const targetHandle = getNodeHandle(targetNode, edge?.targetHandle);
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
      edges,
    );
    setEdges(newEdges);

    // next, swap the source and target handle derivations
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === sourceNodeId) {
          if (
            !("handles" in node.data) ||
            !node.data.handles ||
            !sourceHandle ||
            sourceNode.type !== "entity_type"
          ) {
            return node;
          }
          const group = node.data.handles[sourceHandle.position];
          return {
            ...node,
            data: {
              ...node.data,
              handles: {
                ...node.data.handles,
                [sourceHandle.position]: {
                  ...group,
                  handles: group?.handles?.map((h) =>
                    h.id === sourceHandle.handle.id
                      ? { ...h, derivation: targetHandle?.handle.derivation }
                      : h,
                  ),
                },
              },
            },
          } as DEMONode;
        }
        if (node.id === targetNodeId) {
          if (
            !("handles" in node.data) ||
            !node.data.handles ||
            !targetHandle ||
            targetNode.type !== "entity_type"
          ) {
            return node;
          }
          const group = node.data.handles[targetHandle.position];
          return {
            ...node,
            data: {
              ...node.data,
              handles: {
                ...node.data.handles,
                [targetHandle.position]: {
                  ...group,
                  handles: group?.handles?.map((h) =>
                    h.id === targetHandle.handle.id
                      ? { ...h, derivation: sourceHandle?.handle.derivation }
                      : h,
                  ),
                },
              },
            },
          } as DEMONode;
        }
        return node;
      }),
    );
  };
  return swapConnection;
};

export default useSwapConnection;
