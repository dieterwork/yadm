import type { DEMOHandle } from "$/features/nodes/nodes.types";
import type { DEMOEdge } from "$/features/edges/edges.types";
import { Position, type XYPosition } from "@xyflow/react";

export type HandleWithPosition = {
  handle: DEMOHandle;
  position: Position;
};

export type ConnectedHandlePair = {
  source: HandleWithPosition;
  sourceXY: XYPosition;
  target: HandleWithPosition;
};

const getConnectedHandlePairs = (
  nodeAId: string,
  nodeAHandles: HandleWithPosition[],
  nodeAAbsolutePosition: Partial<XYPosition>,
  nodeADimensions: { width: number; height: number },
  nodeBId: string,
  nodeBHandles: HandleWithPosition[],
  edges: DEMOEdge[],
): ConnectedHandlePair[] => {
  const connectedEdges = edges.filter(
    (edge) =>
      (edge.source === nodeAId && edge.target === nodeBId) ||
      (edge.source === nodeBId && edge.target === nodeAId),
  );

  return connectedEdges.flatMap((edge) => {
    const nodeAHandleId =
      edge.source === nodeAId ? edge.sourceHandle : edge.targetHandle;
    const nodeBHandleId =
      edge.source === nodeBId ? edge.sourceHandle : edge.targetHandle;

    if (!nodeAHandleId || !nodeBHandleId) return [];

    const source = nodeAHandles.find((h) => h.handle.id === nodeAHandleId);
    const target = nodeBHandles.find((h) => h.handle.id === nodeBHandleId);

    if (!source || !target) return [];

    const sourceXY: XYPosition = {
      x:
        source.position === Position.Left
          ? (nodeAAbsolutePosition.x ?? 0)
          : source.position === Position.Right
            ? (nodeAAbsolutePosition.x ?? 0) + nodeADimensions.width
            : (nodeAAbsolutePosition.x ?? 0) +
              nodeADimensions.width * source.handle.offset,
      y:
        source.position === Position.Top
          ? (nodeAAbsolutePosition.y ?? 0)
          : source.position === Position.Bottom
            ? (nodeAAbsolutePosition.y ?? 0) + nodeADimensions.height
            : (nodeAAbsolutePosition.y ?? 0) +
              nodeADimensions.height * source.handle.offset,
    };

    return [{ source, sourceXY, target }];
  });
};

export default getConnectedHandlePairs;
