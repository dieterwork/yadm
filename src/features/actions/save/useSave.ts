import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import debounce from "$/shared/utils/debounce";

const useSave = () => {
  const DEMOInstance = useDEMOModelerStore((state) => state.DEMOInstance);
  const save = () => {
    if (!DEMOInstance) return;
    const jsonModel = JSON.stringify(DEMOInstance.toObject());
    localStorage.setItem("demo-model", jsonModel);
  };

  const autoSave = debounce(() => {
    save();
  }, 3000);

  return { save, autoSave };
};

export default useSave;
