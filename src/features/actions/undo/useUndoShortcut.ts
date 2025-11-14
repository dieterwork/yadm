import {
  setUndoAction,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import useTemporalDEMOModelerStore from "$/features/modeler/useTemporalDEMOModelerStore";
import { useEffect } from "react";

const useUndoShortcut = () => {
  const { undo, redo } = useTemporalDEMOModelerStore((state) => state);
  const undoAction = useDEMOModelerStore((state) => state.undoAction);

  useEffect(() => {
    const undoHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (undoAction !== "undo") {
          setUndoAction("undo");
        }
        undo();
      }
    };

    const redoHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        if (undoAction !== "redo") {
          setUndoAction("redo");
        }
        redo();
      }
    };

    const handleKeyUp = () => {
      setUndoAction(null);
    };

    document.addEventListener("keydown", undoHandler);
    document.addEventListener("keydown", redoHandler);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", undoHandler);
      document.removeEventListener("keydown", redoHandler);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setUndoAction, undoAction, undo, redo]);
};

export default useUndoShortcut;
