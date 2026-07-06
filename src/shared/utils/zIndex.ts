import {
  getNode,
  setNodes,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";

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

export const bringNodeToFront = (nodeId: string, nodes: DEMONode[]) => {
  const max = Math.max(...nodes.map((n) => n.zIndex ?? 0));

  // set nodes to that z-index
  setNodes((nodes) =>
    nodes.map((n) => (n.id === nodeId ? { ...n, zIndex: max + 1 } : n)),
  );
};

export const sendNodeToBack = (nodeId: string, nodes: DEMONode[]) => {
  const min = Math.min(...nodes.map((n) => n.zIndex ?? 0));

  // set nodes to that z-index
  setNodes((nodes) =>
    nodes.map((n) =>
      n.id === nodeId ? { ...n, zIndex: Math.max(0, min - 1) } : n,
    ),
  );
};
