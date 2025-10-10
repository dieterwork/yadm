import type { Position } from "@xyflow/react";

export const calcConnectionLineTargetXForTransactionTimeEdge = (
  toX: number,
  fromX: number,
  nodeX: number,
  fromPosition: Position,
  nodeWidth?: number
) => {
  if (!nodeWidth) return toX;
  if (
    (toX < nodeX && fromPosition === "left") ||
    (toX > nodeX + nodeWidth && fromPosition === "right")
  ) {
    return toX;
  } else {
    return fromX + (fromPosition === "left" ? -20 : 20);
  }
};
