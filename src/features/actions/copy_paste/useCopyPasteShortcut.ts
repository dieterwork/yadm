import { useEffect } from "react";
import useCopyPaste from "./useCopyPaste";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";

const useCopyPasteShortcut = () => {
  const { copy, paste, cut } = useCopyPaste();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (!isEnabled) return;
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "c") copy();
      else if (e.key === "v") paste();
      else if (e.key === "x") cut();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isEnabled, copy, paste, cut]);
};

export default useCopyPasteShortcut;
