import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import { SHARED_MODEL_STORAGE_KEY } from "$/features/modeler/hooks/useSharedServerModel";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { takeWhiteboardSnapshot } from "../store/useWhiteboardUndoRedoStore";
import saveLocalModel from "$/features/actions/save/saveLocalModel";

const takeWhiteboardSnapshotAndSave = () => {
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

  const whiteboardNodes = nodes.filter((node) => node.type === "whiteboard");

  takeWhiteboardSnapshot(whiteboardNodes);
  if (localStorage.getItem(SHARED_MODEL_STORAGE_KEY) !== "true") {
    saveLocalModel(model);
  }
};

export default takeWhiteboardSnapshotAndSave;
