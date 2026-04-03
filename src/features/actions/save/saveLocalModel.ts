import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";

const saveLocalModel = () => {
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

  localStorage.setItem("yadm-model", JSON.stringify(model));
};
export default saveLocalModel;
