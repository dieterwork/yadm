import { useEffect } from "react";
import {
  redo,
  setUndoAction,
  undo,
  useUndoRedoStore,
} from "./useUndoRedoStore";

const useUndoShortcut = () => {
  const undoAction = useUndoRedoStore((state) => state.action);
  const pastHistory = useUndoRedoStore((state) => state.past);
  const futureHistory = useUndoRedoStore((state) => state.future);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (
        event.key?.toLowerCase() === "y" &&
        (event.ctrlKey || event.metaKey) &&
        futureHistory.length > 0
      ) {
        redo();
        setUndoAction("redo");
      } else if (
        event.key?.toLowerCase() === "z" &&
        (event.ctrlKey || event.metaKey) &&
        pastHistory.length > 0
      ) {
        undo();
        setUndoAction("undo");
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (undoAction) return;
      if (
        e.key.toLowerCase() === "z" ||
        e.key.toLowerCase() === "y" ||
        e.key.toLowerCase() === "control" ||
        e.key.toLowerCase() === "meta"
      ) {
        setUndoAction(null);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keydown", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.addEventListener("keydown", keyUpHandler);
    };
  }, [undo, redo, setUndoAction, undoAction]);
};

export default useUndoShortcut;
