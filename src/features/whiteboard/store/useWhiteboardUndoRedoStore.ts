import { setNodes } from "$/features/modeler/store/useDEMOModelerStore";
import type {
  DEMONode,
  WhiteboardNodeType,
} from "$/features/nodes/nodes.types";
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

export const setPast = (past: ReactStyleStateSetter<HistoryItem[]>) => {
  useWhiteboardUndoRedoStore.setState((state) => ({
    past: Array.isArray(past) ? past : past(state.past),
  }));
};

export const setFuture = (future: ReactStyleStateSetter<HistoryItem[]>) => {
  useWhiteboardUndoRedoStore.setState((state) => ({
    future: Array.isArray(future) ? future : future(state.future),
  }));
};

export const takeWhiteboardSnapshot = (
  whiteboardNodes: WhiteboardNodeType[]
) => {
  const maxHistorySize = useWhiteboardUndoRedoStore.getState().maxHistorySize;
  // push the current graph to the past state
  setPast((past) => [
    ...past.slice(
      past.length - (maxHistorySize ?? past.length - 1) + 1,
      past.length
    ),
    whiteboardNodes,
  ]);

  // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
  setFuture([]);
};

export const debounceTakeSnapshot = debounce(takeWhiteboardSnapshot, 3000);

export const undoWhiteboard = (whiteboardNodes: WhiteboardNodeType[]) => {
  const past = useWhiteboardUndoRedoStore.getState().past;
  // get the last state that we want to go back to
  const pastState = past[past.length - 1];

  if (pastState) {
    // first we remove the state from the history
    setPast((past) => past.slice(0, past.length - 1));
    // we store the current graph for the redo operation
    setFuture((future) => [...future, whiteboardNodes]);
    // now we can set the graph to the past state
    const newNodes: DEMONode[] = [];
    setNodes((nodes) =>
      nodes.reduce((acc, current) => {
        if (current.type !== "whiteboard") {
          acc.push(current);
          return acc;
        } else {
          // see if current node exists in history state
          const newWhiteboardNode = pastState.find(
            (whiteboard) => whiteboard.id === current.id
          );

          if (newWhiteboardNode) {
            acc.push(newWhiteboardNode);
          }
          return acc;
        }
      }, newNodes)
    );
  }
};

export const redoWhiteboard = (whiteboardNodes: WhiteboardNodeType[]) => {
  const future = useWhiteboardUndoRedoStore.getState().future;
  const futureState = future[future.length - 1];

  if (futureState) {
    setFuture((future) => future.slice(0, future.length - 1));
    setPast((past) => [...past, whiteboardNodes]);
    const newNodes: DEMONode[] = [];
    setNodes((nodes) =>
      nodes.reduce((acc, current) => {
        if (current.type !== "whiteboard") {
          acc.push(current);
          return acc;
        } else {
          // see if current node exists in history state
          const newWhiteboardNode = futureState.find(
            (whiteboard) => whiteboard.id === current.id
          );

          if (newWhiteboardNode) {
            acc.push(newWhiteboardNode);
          }
          return acc;
        }
      }, newNodes)
    );
  }
};

export const setUndoAction = (action: "undo" | "redo" | null) => {
  useWhiteboardUndoRedoStore.setState(() => ({ action }));
};
