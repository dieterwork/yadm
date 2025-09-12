import type { XYPosition } from "@xyflow/react";

export const calcConnectionLineTargetXForTransactionTimeEdge = (
  toX: number,
  fromX: number,
  nodeDimensions: { width?: number; height?: number },
  nodePosition: XYPosition
) => {
  if (!nodeDimensions.width || !nodeDimensions.height) return toX;
  if (
    toX < nodePosition.x - nodeDimensions.width / 2 ||
    toX > nodePosition.x + nodeDimensions.width / 2
  ) {
    return toX;
  } else {
    return fromX;
  }
};
