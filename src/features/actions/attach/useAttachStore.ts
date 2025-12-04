import { setAction } from "$/features/modeler/useDEMOModelerStore";
import { create } from "zustand";
import toast from "react-hot-toast/headless";

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
  const childNodeId = useAttachStore.getState().childNodeId;
  if (childNodeId) {
    toast.dismiss(childNodeId);
  }
  useAttachStore.setState(() => ({
    childNodeId: null,
  }));
  setAction("pan");
};
