import useShortcut from "$/features/keyboard/useShortcut";
import toast from "react-hot-toast/headless";
import {
  saveModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";

const useSaveShortcut = () => {
  const fileName = useDEMOModelerStore((state) => state.fileName);
  useShortcut(["Control+s", "Meta+s"], () => {
    saveModel();
    toast.success(`Saved "${fileName}"`);
  });
};

export default useSaveShortcut;
