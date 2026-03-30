import { create } from "zustand";
import type { Points } from "../types/draw.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";

interface DrawState {
  points: Points;
  isEnabled: boolean;
}

export const useDrawStore = create<DrawState>()((set, get) => ({
  points: [],
  isEnabled: false,
}));

export const setPoints = (newPoints: ReactStyleStateSetter<Points>) => {
  useDrawStore.setState((state) => ({
    points: Array.isArray(newPoints) ? newPoints : newPoints(state.points),
  }));
};

export const setEnabled = (isEnabled: ReactStyleStateSetter<boolean>) => {
  useDrawStore.setState((state) => ({
    isEnabled:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isDisabled),
  }));
};
