import { create } from "zustand";

interface InitialState {
  color: string;
}

const useWhiteboardStore = create<InitialState>()((set) => ({
  color: "#000",
}));

export const setColor = (color: string) => {
  useWhiteboardStore.setState(() => ({ color }));
};

export default useWhiteboardStore;
