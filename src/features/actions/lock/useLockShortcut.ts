import useShortcut from "$/features/keyboard/useShortcut";
import { setEnabled } from "$/features/modeler/useDEMOModelerStore";

const useLockShortcut = () => {
  useShortcut(["Meta+l", "Control+l"], () =>
    setEnabled((isEnabled) => !isEnabled)
  );
};

export default useLockShortcut;
