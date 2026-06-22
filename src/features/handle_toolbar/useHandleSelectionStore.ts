import { create } from "zustand";

const useHandleSelectionStore = create<{ selectedHandleId: string | null }>()(() => ({
  selectedHandleId: null,
}));

export const setSelectedHandleId = (id: string | null) =>
  useHandleSelectionStore.setState({ selectedHandleId: id });

export default useHandleSelectionStore;
