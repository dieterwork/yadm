import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";

const saveLocalModel = (model: DEMOModelJSON) => {
  localStorage.setItem("yadm-model", JSON.stringify(model));
};
export default saveLocalModel;
