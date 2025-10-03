import useSave from "./useSave";
import useShortcut from "$/features/keyboard/useShortcut";

const useSaveShortcut = () => {
  const { save } = useSave();
  useShortcut(["Control+s", "Meta+s"], () => save());
};

export default useSaveShortcut;
