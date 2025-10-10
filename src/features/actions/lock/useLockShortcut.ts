import useShortcut from "$/features/keyboard/useShortcut";
import { toggleLock } from "$/features/modeler/useDEMOModelerStore";

const useLockShortcut = () => {
  useShortcut(["Meta+l", "Control+l"], () =>
    toggleLock((isEnabled) => !isEnabled)
  );
};

export default useLockShortcut;
