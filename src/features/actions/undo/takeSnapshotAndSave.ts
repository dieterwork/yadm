import {
  debounceSaveLocalModel,
  saveLocalModel,
} from "$/features/actions/save/saveLocalModel";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { takeSnapshot } from "./useUndoRedoStore";

const takeSnapshotAndSave = () => {
  const edges = useDEMOModelerStore.getState().edges;
  const nodes = useDEMOModelerStore.getState().nodes;
  const viewport = useDEMOModelerStore.getState().viewport;
  const isEnabled = useDEMOModelerStore.getState().isEnabled;
  const fileName = useDEMOModelerStore.getState().fileName;
  const model = {
    edges,
    nodes,
    viewport,
    isEnabled,
    fileName,
    version: "1.0.0",
  } satisfies DEMOModelJSON;

  takeSnapshot(nodes, edges);
  saveLocalModel(model);
};

export default takeSnapshotAndSave;
