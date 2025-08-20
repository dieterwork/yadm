import uuid from "../../shared/utils/uuid";
import type { DEMONode } from "../nodes/nodes.types";

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

export const getChildNodes = (selectedNodes: DEMONode[], nodes: DEMONode[]) => {
  const collectedChildNodes: DEMONode[] = [];
  collectChildNodes(selectedNodes, collectedChildNodes, nodes);

  return collectedChildNodes;
};

export const getDisabledNodes = (
  selectedNodes: DEMONode[],
  disabledNodeTypes: DEMONode["type"][]
) => {
  return selectedNodes.filter((node) => {
    return disabledNodeTypes.some((type) => node.type === type);
  });
};

export const showDisabledNodesError = (disabledNodes: DEMONode[]) => {
  return disabledNodes.map((node) =>
    console.error(`Cannot copy node type ${node.type}`)
  );
};

export const setNewIdsForNode = (node: DEMONode, nodes: DEMONode[]) => {
  const id = uuid();
  nodes.find((_node) => _node?.parentId === node.id);
};
