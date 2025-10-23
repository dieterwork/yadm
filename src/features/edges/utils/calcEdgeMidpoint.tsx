import type { XYPosition } from "@xyflow/react";

export const calcEdgeMidpoint = (
  sourcePos: XYPosition,
  targetPos: XYPosition
): XYPosition => ({
  x: (sourcePos.x + targetPos.x) / 2,
  y: (sourcePos.y + targetPos.y) / 2,
});
