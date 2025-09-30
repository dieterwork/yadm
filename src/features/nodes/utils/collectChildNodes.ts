import type { DEMONode } from "../nodes.types";

const collectChildNodes = (
  parentNodes: DEMONode[],
  collectedChildNodes: DEMONode[],
  nodes: DEMONode[]
) => {
  // store collected nodes for this iteration
  const _collectedNodes: DEMONode[] = [];

  for (const parentNode of parentNodes) {
    for (const node of nodes) {
      if (node.parentId !== parentNode.id) continue;
      if (collectedChildNodes.includes(node)) continue;

      // push to both child nodes and local collected nodes
      collectedChildNodes.push(node);
      _collectedNodes.push(node);
    }
  }

  // stop collection once there's no more nodes to collect
  if (_collectedNodes.length === 0) return;

  collectChildNodes(_collectedNodes, collectedChildNodes, nodes);
};

export default collectChildNodes;
