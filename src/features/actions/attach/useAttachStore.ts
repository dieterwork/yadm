import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { create } from "zustand";

interface AttachState {
  childNodeId: string | null;
}

export const useAttachStore = create<AttachState>()(() => ({
  childNodeId: null,
}));

export const setAttachChildNodeId = (id: string) => {
  useAttachStore.setState(() => ({ childNodeId: id }));
  useDEMOModelerStore.setState(() => ({
    state: "attach",
  }));
};

export const resetAttach = () => {
  useAttachStore.setState(() => ({
    childNodeId: null,
  }));
  useDEMOModelerStore.setState(() => ({
    state: useDEMOModelerStore.getInitialState().state,
  }));
};
