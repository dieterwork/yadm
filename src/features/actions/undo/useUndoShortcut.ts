import {
  setUndoAction,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import useTemporalDEMOModelerStore from "$/features/modeler/useTemporalDEMOModelerStore";
import { useEffect } from "react";

const useUndoShortcut = () => {
  const { undo, redo, futureStates } = useTemporalDEMOModelerStore(
    (state) => state
  );

  const undoAction = useDEMOModelerStore((state) => state.undoAction);

  useEffect(() => {
    const undoHandler = (e: KeyboardEvent) => {
      if (e.key?.toLowerCase() === "y" && (e.ctrlKey || e.metaKey)) {
        if (undoAction !== "redo") {
          setUndoAction("redo");
        }
        redo();
      } else if (e.key?.toLowerCase() === "z" && (e.ctrlKey || e.metaKey)) {
        if (undoAction !== "undo") {
          setUndoAction("undo");
        }
        undo();
      }
    };

    const handleKeyUp = () => {
      setUndoAction(null);
    };

    document.addEventListener("keydown", undoHandler);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", undoHandler);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setUndoAction, undoAction, undo, redo]);
};

export default useUndoShortcut;
