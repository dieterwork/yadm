import type { DEMOModelJSON } from "../../../shared/types/reactFlow.types";
import debounce from "../../../shared/utils/debounce";

export const saveLocalModel = (model: DEMOModelJSON) => {
  localStorage.setItem("yadm-model", JSON.stringify(model));
};

export const debounceSaveLocalModel = debounce(saveLocalModel, 3000);
