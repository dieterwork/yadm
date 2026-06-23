import { useEffect, useState } from "react";
import {
  setHandleEditModeEnabled,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";

const useHandleEditModeShortcut = () => {
  const isHandleEditModeEnabled = useDEMOModelerStore(
    (state) => state.isHandleEditModeEnabled,
  );
  const [isPressed, setPressed] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Shift" && !isHandleEditModeEnabled) {
      setHandleEditModeEnabled(true);
      setPressed(true);
    }
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Shift" && isPressed) {
      setHandleEditModeEnabled(false);
      setPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};

export default useHandleEditModeShortcut;
