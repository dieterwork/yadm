import { setAction } from "$/features/modeler/useDEMOModelerStore";
import { create } from "zustand";

interface AttachState {
  childNodeId: string | null;
}

export const useAttachStore = create<AttachState>()(() => ({
  childNodeId: null,
}));

export const setAttachChildNodeId = (id: string) => {
  useAttachStore.setState(() => ({ childNodeId: id }));
  setAction("attach");
};

export const resetAttach = () => {
  useAttachStore.setState(() => ({
    childNodeId: null,
  }));
  setAction("pan");
};
