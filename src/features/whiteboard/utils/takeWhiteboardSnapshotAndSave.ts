import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import { SHARED_MODEL_STORAGE_KEY } from "$/features/modeler/hooks/useSharedServerModel";
import { takeWhiteboardSnapshot } from "../store/useWhiteboardUndoRedoStore";
import saveLocalModel from "$/features/actions/save/saveLocalModel";

const takeWhiteboardSnapshotAndSave = () => {
  const nodes = useDEMOModelerStore.getState().nodes;
  const whiteboardNodes = nodes.filter((node) => node.type === "whiteboard");

  takeWhiteboardSnapshot(whiteboardNodes);
  if (localStorage.getItem(SHARED_MODEL_STORAGE_KEY) !== "true") {
    saveLocalModel();
  }
};

export default takeWhiteboardSnapshotAndSave;
