import type { DEMONode } from "../nodes/nodes.types";

export const matchNode = (
  node: DEMONode,
  disabledNodes: DEMONode["type"] | DEMONode["type"][]
) => {
  return Array.isArray(disabledNodes)
    ? disabledNodes.includes(node.type)
    : disabledNodes === node.type;
};
