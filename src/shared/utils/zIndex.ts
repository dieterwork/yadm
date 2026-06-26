import { setNodes } from "$/features/modeler/store/useDEMOModelerStore";

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

export const bringToTop = (
  nodeId: string,
  nodes: { id: string; zIndex?: number }[],
) => {
  const max = Math.max(...nodes.map((n) => n.zIndex ?? 0));
  setNodes((nodes) =>
    nodes.map((n) => (n.id === nodeId ? { ...n, zIndex: max + 1 } : n)),
  );
};

export const sendToBottom = (
  nodeId: string,
  nodes: { id: string; zIndex?: number }[],
) => {
  const min = Math.min(...nodes.map((n) => n.zIndex ?? 0));
  setNodes((nodes) =>
    nodes.map((n) => (n.id === nodeId ? { ...n, zIndex: min - 1 } : n)),
  );
};
