import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  setEdges,
  setNodes,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import debounce from "$/shared/utils/debounce";
import { create } from "zustand";

type HistoryItem = {
  nodes: DEMONode[];
  edges: DEMOEdge[];
};

interface UndoRedoState {
  action: "undo" | "redo" | null;
  past: HistoryItem[];
  future: HistoryItem[];
  maxHistorySize?: number;
  filters?: {
    nodes?: DEMONode["type"][];
    edges?: DEMOEdge["type"][];
  };
}

export const useUndoRedoStore = create<UndoRedoState>()(() => ({
  action: null,
  maxHistorySize: 50,
  past: [],
  future: [],
  filters: {
    nodes: ["whiteboard"],
  },
}));

export const setPast = (past: ReactStyleStateSetter<HistoryItem[]>) => {
  useUndoRedoStore.setState((state) => ({
    past: Array.isArray(past) ? past : past(state.past),
  }));
};

export const setFuture = (future: ReactStyleStateSetter<HistoryItem[]>) => {
  useUndoRedoStore.setState((state) => ({
    future: Array.isArray(future) ? future : future(state.future),
  }));
};

export const takeSnapshot = (nodes: DEMONode[], edges: DEMOEdge[]) => {
  const maxHistorySize = useUndoRedoStore.getState().maxHistorySize;
  const filters = useUndoRedoStore.getState().filters;
  // push the current graph to the past state
  setPast((past) => [
    ...past.slice(
      past.length - (maxHistorySize ?? past.length - 1) + 1,
      past.length
    ),
    {
      nodes: nodes.filter((node) => !filters?.nodes?.includes(node.type)),
      edges,
    },
  ]);

  // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
  setFuture([]);
};

export const debounceTakeSnapshot = debounce(takeSnapshot, 3000);

export const undo = (nodes: DEMONode[], edges: DEMOEdge[]) => {
  const filters = useUndoRedoStore.getState().filters;
  const past = useUndoRedoStore.getState().past;
  // get the last state that we want to go back to
  const pastState = past[past.length - 1];

  if (pastState) {
    // first we remove the state from the history
    setPast((past) => past.slice(0, past.length - 1));
    // we store the current graph for the redo operation
    setFuture((future) => [...future, { nodes: nodes, edges: edges }]);
    // now we can set the graph to the past state
    const newNodes: DEMONode[] = [];
    setNodes((nodes) =>
      nodes.reduce((acc, current) => {
        if (!filters?.nodes?.includes(current.type)) {
          acc.push(current);
          return acc;
        } else {
          // see if current node exists in history state
          const newWhiteboardNode = pastState.nodes.find(
            (whiteboard) => whiteboard.id === current.id
          );

          if (newWhiteboardNode) {
            acc.push(newWhiteboardNode);
          }
          return acc;
        }
      }, newNodes)
    );
    setEdges(pastState.edges);
  }
};

export const redo = (nodes: DEMONode[], edges: DEMOEdge[]) => {
  const filters = useUndoRedoStore.getState().filters;
  const future = useUndoRedoStore.getState().future;
  const futureState = future[future.length - 1];

  if (futureState) {
    setFuture((future) => future.slice(0, future.length - 1));
    setPast((past) => [...past, { nodes: nodes, edges: edges }]);
    const newNodes: DEMONode[] = [];
    setNodes((nodes) =>
      nodes.reduce((acc, current) => {
        if (!filters?.nodes?.includes(current.type)) {
          acc.push(current);
          return acc;
        } else {
          // see if current node exists in history state
          const newWhiteboardNode = futureState.nodes.find(
            (whiteboard) => whiteboard.id === current.id
          );

          if (newWhiteboardNode) {
            acc.push(newWhiteboardNode);
          }
          return acc;
        }
      }, newNodes)
    );
    setEdges(futureState.edges);
  }
};

export const setUndoAction = (action: "undo" | "redo" | null) => {
  useUndoRedoStore.setState(() => ({ action }));
};
