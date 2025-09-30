import { ALL_NODE_SCOPE_OPTIONS, type NodeScope } from "../nodes.types";

export function isNodeScope(value: string): value is NodeScope {
  return ALL_NODE_SCOPE_OPTIONS.includes(value as NodeScope);
}
