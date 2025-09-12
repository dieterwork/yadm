import { create } from "zustand";

interface AttachState {
  isAttaching: boolean;
  childNodeId: string | null;
  setAttaching: (isAttaching: boolean) => void;
  setChildNodeId: (id: string) => void;
  reset: () => void;
}

export const useAttachStore = create<AttachState>()((set, get) => ({
  childNodeId: null,
  isAttaching: false,
  setChildNodeId: (id) => {
    set({ childNodeId: id });
  },
  setAttaching: (isAttaching) => {
    set({ isAttaching });
  },
  reset: () => {
    set(() => ({ childNodeId: null, isAttaching: false }));
  },
}));
