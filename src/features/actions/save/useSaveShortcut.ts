import useSave from "./useSave";
import useShortcut from "$/features/keyboard/useShortcut";
import toast from "react-hot-toast/headless";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";

const useSaveShortcut = () => {
  const { save } = useSave();
  const fileName = useDEMOModelerStore((state) => state.fileName);
  useShortcut(["Control+s", "Meta+s"], () => {
    save();
    toast.success(`Saved "${fileName}"`);
  });
};

export default useSaveShortcut;
