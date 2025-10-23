import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import debounce from "$/shared/utils/debounce";
import toast from "react-hot-toast/headless";

const useSave = () => {
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const save = () => {
    if (!DEMOInstance) return;
    const jsonModel = JSON.stringify({
      ...DEMOInstance.toObject(),
      isEnabled,
      version: "1.0.0",
    } satisfies DEMOModelJSON);
    localStorage.setItem("demo-model", jsonModel);
  };

  const autoSave = debounce(() => {
    save();
  }, 3000);

  return { save, autoSave };
};

export default useSave;
