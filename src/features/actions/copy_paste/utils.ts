import type { DEMONode } from "../../nodes/nodes.types";

export const getDisabledNodes = (
  selectedNodes: DEMONode[],
  disabledNodeTypes?: DEMONode["type"][]
) => {
  if (!disabledNodeTypes) return selectedNodes;
  return selectedNodes.filter((node) => {
    return disabledNodeTypes.some((type) => node.type === type);
  });
};

export const showDisabledNodesError = (disabledNodes: DEMONode[]) => {
  return disabledNodes.map((node) =>
    console.error(`Cannot copy node type ${node.type}`)
  );
};
