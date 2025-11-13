import { useStoreWithEqualityFn } from "zustand/traditional";
import {
  useDEMOModelerStore,
  type DEMOModelerState,
} from "./useDEMOModelerStore";
import type { TemporalState } from "zundo";
import { useStore } from "zustand";

type PartializedDEMOModelerState = Pick<DEMOModelerState, "edges" | "nodes">;

const useTemporalDEMOModelerStore = <T>(
  // Use partalized StoreState type as the generic here
  selector: (state: TemporalState<PartializedDEMOModelerState>) => T
) => useStore(useDEMOModelerStore.temporal, selector);

export default useTemporalDEMOModelerStore;
