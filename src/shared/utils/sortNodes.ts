import { getNode } from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "../../features/nodes/nodes.types";

type NodeMapNode = DEMONode & { children: NodeMapNode[] };

const traverseNode = (node: NodeMapNode, result: NodeMapNode[]) => {
  result.push(node);
  for (const child of node.children) {
    traverseNode(child, result);
  }
};

export const sortNodes = (a: DEMONode, b: DEMONode, nodes: DEMONode[]) => {
  const getNodeDepth = (node: DEMONode) => {
    let depth = 0;
    let currentNode: DEMONode | undefined = node;
    while (currentNode.parentId) {
      currentNode = nodes.find((node) => node.id === currentNode?.parentId);
      if (!currentNode) break;
      depth++;
    }
    return depth;
  };

  if (!a.parentId && b.parentId) return -1;
  if (a.parentId && !b.parentId) return 1;

  // If both have parentIds, show deeper children later.
  const depthA = getNodeDepth(a);
  const depthB = getNodeDepth(b);

  if (depthA !== depthB) return depthA - depthB;
  return -1;
};
