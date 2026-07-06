import {
  getNode,
  setEdges,
  setNodes,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import getChildNodes from "$/features/nodes/utils/getChildNodes";
import type { NodeConnection } from "@xyflow/react";

export const zIndexMap = {
  node: 190,
  nodeChild: 191,
  nodeGrandchild: 192,
  nodeDeepChild: 193,
  edge: 300,
  handle: 400,
  edgeToolbar: 1000,
  handleToolbar: 1000,
  nodeToolbar: 1000,
  whiteboard: 2000,
  notification: 99999,
} as const;

export const bringNodeToFront = (
  nodeId: string,
  nodes: DEMONode[],
  connections: NodeConnection[],
) => {
  const node = getNode(nodeId);
  if (!node) return;
  const childNodes = getChildNodes([node], nodes);
  const max =
    childNodes.length > 0
      ? Math.max(...childNodes.map((n) => n.zIndex ?? 0))
      : Math.max(...nodes.map((n) => n.zIndex ?? 0));

  // get ghost nodes tied to the node
  const targetNodes = nodes.filter((n) =>
    connections.map((c) => c.target).includes(n.id),
  );

  const ghostNodeIds = targetNodes
    .filter((n) => n.type === "ghost")
    .map((n) => n.id);

  // set nodes to max z-index
  // set ghost nodes to match max node
  const nodeMaxZIndex = max + 1;
  setNodes((nodes) =>
    nodes.map((n) =>
      n.id === nodeId || ghostNodeIds.includes(n.id)
        ? { ...n, zIndex: nodeMaxZIndex }
        : n,
    ),
  );

  // set edges to match max z-index
  const edgeIds = connections.map((c) => c.edgeId);

  setEdges((edges) =>
    edges.map((e) =>
      edgeIds.includes(e.id) ? { ...e, zIndex: nodeMaxZIndex } : e,
    ),
  );
};

export const sendNodeToBack = (
  nodeId: string,
  nodes: DEMONode[],
  connections: NodeConnection[],
) => {
  const node = getNode(nodeId);
  if (!node) return;
  const parentNode = getNode(node.parentId);
  const childNodes = getChildNodes([node], nodes);
  const min =
    childNodes.length > 0
      ? Math.min(...childNodes.map((n) => n.zIndex ?? 0))
      : Math.min(...nodes.map((n) => n.zIndex ?? 0));

  const sourceNodes = nodes.filter((n) =>
    connections.map((c) => c.source).includes(n.id),
  );
  const targetNodes = nodes.filter((n) =>
    connections.map((c) => c.target).includes(n.id),
  );
  const ghostNodeIds = targetNodes
    .filter((n) => n.type === "ghost")
    .map((n) => n.id);

  // set nodes to min z-index
  // make sure it doesn't go below the parent z-index
  //
  const nodeMinZIndex = Math.max(min - 1, parentNode?.zIndex ?? 0);
  setNodes((nodes) =>
    nodes.map((n) =>
      n.id === nodeId || ghostNodeIds.includes(n.id)
        ? { ...n, zIndex: nodeMinZIndex }
        : n,
    ),
  );

  // set edges to match max z-index between nodes
  const edgeIds = connections.map((c) => c.edgeId);

  const sourceAndTargetNodes = [...sourceNodes, ...targetNodes];

  const max = Math.max(...sourceAndTargetNodes.map((n) => n.zIndex ?? 0));

  // set min between max and nodeMinZIndex since we updated ghost nodes that doesn't get reflected in updated nodes array
  setEdges((edges) =>
    edges.map((e) =>
      edgeIds.includes(e.id)
        ? { ...e, zIndex: Math.min(max, nodeMinZIndex) }
        : e,
    ),
  );
};
