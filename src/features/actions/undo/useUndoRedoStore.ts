import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  autoSaveModel,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
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
}

export const useUndoRedoStore = create<UndoRedoState>()(() => ({
  action: null,
  maxHistorySize: 50,
  past: [],
  future: [],
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

export const takeSnapshot = () => {
  const maxHistorySize = useUndoRedoStore.getState().maxHistorySize;
  const nodes = useDEMOModelerStore.getState().nodes;
  const edges = useDEMOModelerStore.getState().edges;
  // push the current graph to the past state
  setPast((past) => [
    ...past.slice(
      past.length - (maxHistorySize ?? past.length - 1) + 1,
      past.length
    ),
    { nodes: nodes, edges: edges },
  ]);

  // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
  setFuture([]);

  // autosave model
  autoSaveModel();
};

export const undo = () => {
  const past = useUndoRedoStore.getState().past;
  const nodes = useDEMOModelerStore.getState().nodes;
  const edges = useDEMOModelerStore.getState().edges;
  // get the last state that we want to go back to
  const pastState = past[past.length - 1];

  if (pastState) {
    // first we remove the state from the history
    setPast((past) => past.slice(0, past.length - 1));
    // we store the current graph for the redo operation
    setFuture((future) => [...future, { nodes: nodes, edges: edges }]);
    // now we can set the graph to the past state
    setNodes(pastState.nodes);
    setEdges(pastState.edges);
  }
};

export const redo = () => {
  const future = useUndoRedoStore.getState().future;
  const nodes = useDEMOModelerStore.getState().nodes;
  const edges = useDEMOModelerStore.getState().edges;
  const futureState = future[future.length - 1];

  if (futureState) {
    setFuture((future) => future.slice(0, future.length - 1));
    setPast((past) => [...past, { nodes: nodes, edges: edges }]);
    setNodes(futureState.nodes);
    setEdges(futureState.edges);
  }
};

export const setUndoAction = (action: "undo" | "redo" | null) => {
  useUndoRedoStore.setState(() => ({ action }));
};
