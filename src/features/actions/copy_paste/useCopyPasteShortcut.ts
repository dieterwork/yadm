import useCopyPaste from "./useCopyPaste";
import useShortcut from "../../keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";

const useCopyPasteShortcut = () => {
  const { copy, paste, cut } = useCopyPaste();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);

  useShortcut(["Meta+x", "Control+x"], () => {
    if (!isEnabled) return;
    cut();
  });
  useShortcut(["Meta+c", "Control+c"], () => {
    if (!isEnabled) return;
    copy();
  });
  useShortcut(["Meta+v", "Control+v"], () => {
    if (!isEnabled) return;
    paste();
  });
};

export default useCopyPasteShortcut;
