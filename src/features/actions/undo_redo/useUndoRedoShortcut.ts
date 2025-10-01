import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { useEffect } from "react";

const useUndoRedoShortcut = () => {
  const { undo, redo } = useDEMOModelerStore.temporal.getState();
  useEffect(() => {
    console.log("key press");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        redo();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);
};

export default useUndoRedoShortcut;
