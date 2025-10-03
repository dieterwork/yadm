import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import type { XYPosition } from "@xyflow/react";
import { create } from "zustand";

interface ConnectionLineState {
  connectionLinePath: XYPosition[];
}

export const useConnectionLineStore = create<ConnectionLineState>()(() => ({
  connectionLinePath: [],
}));

export const setConnectionLinePath = (
  newConnectionLinePath: ReactStyleStateSetter<XYPosition[]>
) => {
  useConnectionLineStore.setState((state) => ({
    connectionLinePath: Array.isArray(newConnectionLinePath)
      ? newConnectionLinePath
      : newConnectionLinePath(state.connectionLinePath),
  }));
};
