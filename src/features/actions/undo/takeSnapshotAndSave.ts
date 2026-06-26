import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import { SHARED_MODEL_STORAGE_KEY } from "$/features/modeler/hooks/useSharedServerModel";
import saveLocalModel from "../save/saveLocalModel";
import { takeSnapshot } from "./useUndoRedoStore";

const takeSnapshotAndSave = () => {
  const edges = useDEMOModelerStore.getState().edges;
  const nodes = useDEMOModelerStore.getState().nodes;

  takeSnapshot(nodes, edges);
  if (localStorage.getItem(SHARED_MODEL_STORAGE_KEY) !== "true") {
    saveLocalModel();
  }
};

export default takeSnapshotAndSave;
