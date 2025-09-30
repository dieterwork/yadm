import type { DEMONode } from "../nodes.types";
import collectChildNodes from "./collectChildNodes";

const getChildNodes = (
  selectedNodes: DEMONode[],
  nodes: DEMONode[],
  immediateChildren: boolean
) => {
  const collectedChildNodes: DEMONode[] = [];
  collectChildNodes(selectedNodes, collectedChildNodes, nodes);

  return collectedChildNodes;
};

export default getChildNodes;
