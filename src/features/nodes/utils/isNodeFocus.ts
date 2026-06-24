import { ALL_NODE_FOCUS_OPTIONS, type NodeFocus } from "../nodes.types";

export function isNodeFocus(value: string): value is NodeFocus {
  return ALL_NODE_FOCUS_OPTIONS.includes(value as NodeFocus);
}
