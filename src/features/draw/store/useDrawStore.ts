import { create } from "zustand";
import type { Points } from "../types/draw.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import debounce from "$/shared/utils/debounce";

type HistoryItem = Points;

interface DrawState {
  points: Points;
  pastPoints: HistoryItem[];
  futurePoints: HistoryItem[];
  isEnabled: boolean;
  maxHistorySize: number;
  historyAction: "undo" | "redo" | null;
}

export const useDrawStore = create<DrawState>()((set, get) => ({
  points: [],
  isEnabled: false,
  historyAction: null,
  maxHistorySize: 50,
  pastPoints: [],
  futurePoints: [],
}));

export const setPoints = (newPoints: ReactStyleStateSetter<Points>) => {
  useDrawStore.setState((state) => ({
    points: Array.isArray(newPoints) ? newPoints : newPoints(state.points),
  }));
};

export const setEnabled = (isEnabled: ReactStyleStateSetter<boolean>) => {
  useDrawStore.setState((state) => ({
    isEnabled:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
  }));
};

export const clearPoints = () => {
  useDrawStore.setState(() => ({
    points: [],
  }));
};

export const setPastPoints = (
  pastPoints: ReactStyleStateSetter<HistoryItem[]>
) => {
  useDrawStore.setState((state) => ({
    pastPoints: Array.isArray(pastPoints)
      ? pastPoints
      : pastPoints(state.pastPoints),
  }));
};

export const setFuturePoints = (
  futurePoints: ReactStyleStateSetter<HistoryItem[]>
) => {
  useDrawStore.setState((state) => ({
    futurePoints: Array.isArray(futurePoints)
      ? futurePoints
      : futurePoints(state.futurePoints),
  }));
};

export const takePointsSnapshot = (historyItem: HistoryItem) => {
  const maxHistorySize = useDrawStore.getState().maxHistorySize;
  // push the current graph to the past state
  setPastPoints((past) => [
    ...past.slice(
      past.length - (maxHistorySize ?? past.length - 1) + 1,
      past.length
    ),
    historyItem,
  ]);

  // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
  setFuturePoints([]);
};

export const debounceTakePointsSnapshot = debounce(takePointsSnapshot, 3000);

export const undoPoints = (historyItem: Points) => {
  const past = useDrawStore.getState().pastPoints;
  // get the last state that we want to go back to
  const pastState = past[past.length - 1];

  if (pastState) {
    // first we remove the state from the history
    setPastPoints((past) => past.slice(0, past.length - 1));
    // we store the current graph for the redo operation
    setFuturePoints((future) => [...future, historyItem]);
    // now we can set the graph to the past state
    setPoints(pastState);
  }
};

export const redoPoints = (historyItem: Points) => {
  const future = useDrawStore.getState().futurePoints;
  const futureState = future[future.length - 1];

  if (futureState) {
    setFuturePoints((future) => future.slice(0, future.length - 1));
    setPastPoints((past) => [...past, historyItem]);
    setPoints(futureState);
  }
};

export const setHistoryAction = (historyAction: "undo" | "redo" | null) => {
  useDrawStore.setState(() => ({ historyAction }));
};
