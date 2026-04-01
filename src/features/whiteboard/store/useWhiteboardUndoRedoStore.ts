import { setNodes } from "$/features/modeler/store/useDEMOModelerStore";
import type { WhiteboardNodeType } from "$/features/nodes/nodes.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import debounce from "$/shared/utils/debounce";
import { create } from "zustand";

type HistoryItem = WhiteboardNodeType[];

interface UndoRedoState {
  action: "undo" | "redo" | null;
  past: HistoryItem[];
  future: HistoryItem[];
  maxHistorySize?: number;
}

export const useWhiteboardUndoRedoStore = create<UndoRedoState>()(() => ({
  action: null,
  maxHistorySize: 50,
  past: [],
  future: [],
}));

export const setPastWhiteboardHistory = (
  past: ReactStyleStateSetter<HistoryItem[]>
) => {
  useWhiteboardUndoRedoStore.setState((state) => ({
    past: Array.isArray(past) ? past : past(state.past),
  }));
};

export const setFutureWhiteboardHistory = (
  future: ReactStyleStateSetter<HistoryItem[]>
) => {
  useWhiteboardUndoRedoStore.setState((state) => ({
    future: Array.isArray(future) ? future : future(state.future),
  }));
};

export const takeWhiteboardSnapshot = (
  whiteboardNodes: WhiteboardNodeType[]
) => {
  const maxHistorySize = useWhiteboardUndoRedoStore.getState().maxHistorySize;
  // push the current graph to the past state
  setPastWhiteboardHistory((past) => [
    ...past.slice(
      past.length - (maxHistorySize ?? past.length - 1) + 1,
      past.length
    ),
    whiteboardNodes,
  ]);

  // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
  setFutureWhiteboardHistory([]);
};

export const debounceTakeSnapshot = debounce(takeWhiteboardSnapshot, 3000);

export const undoWhiteboard = (whiteboardNodes: WhiteboardNodeType[]) => {
  const past = useWhiteboardUndoRedoStore.getState().past;
  // get the last state that we want to go back to
  const pastState = past[past.length - 1];

  if (pastState) {
    // first we remove the state from the history
    setPastWhiteboardHistory((past) => past.slice(0, past.length - 1));
    // we store the current graph for the redo operation
    setFutureWhiteboardHistory((future) => [...future, whiteboardNodes]);
    // now we can set the graph to the past state
    setNodes((nodes) => {
      const nonWhiteboardNodes = nodes.filter((n) => n.type !== "whiteboard");
      return [...nonWhiteboardNodes, ...pastState];
    });
  }
};

export const redoWhiteboard = (whiteboardNodes: WhiteboardNodeType[]) => {
  const future = useWhiteboardUndoRedoStore.getState().future;
  const futureState = future[future.length - 1];

  if (futureState) {
    setFutureWhiteboardHistory((future) => future.slice(0, future.length - 1));
    setPastWhiteboardHistory((past) => [...past, whiteboardNodes]);
    setNodes((nodes) => {
      const nonWhiteboardNodes = nodes.filter((n) => n.type !== "whiteboard");
      return [...nonWhiteboardNodes, ...futureState];
    });
  }
};

export const setUndoAction = (action: "undo" | "redo" | null) => {
  useWhiteboardUndoRedoStore.setState(() => ({ action }));
};
