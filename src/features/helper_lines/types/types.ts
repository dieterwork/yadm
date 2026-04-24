import type { Position } from "@xyflow/react";

export type HandleChange = {
  nodeId: string;
  offset: number;
  position: Position;
  isDragging: boolean;
};
