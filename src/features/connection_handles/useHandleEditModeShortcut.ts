import { useEffect, useState } from "react";
import {
  setHandleEditModeEnabled,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";

const useHandleEditModeShortcut = () => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "h") {
      e.preventDefault();
      setHandleEditModeEnabled((isEnabled) => !isEnabled);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useHandleEditModeShortcut;
