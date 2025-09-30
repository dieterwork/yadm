import { ALL_NODE_COLORS } from "./colors.consts";
import type { NodeColor } from "./colors.types";

export function isNodeColor(value: string): value is NodeColor {
  return ALL_NODE_COLORS.includes(value as NodeColor);
}
