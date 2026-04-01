import { useEffect } from "react";

import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import {
  redoWhiteboard,
  setUndoAction,
  undoWhiteboard,
  useWhiteboardUndoRedoStore,
} from "../store/useWhiteboardUndoRedoStore";

const useUndoWhiteboardShortcut = () => {
  const undoAction = useWhiteboardUndoRedoStore((state) => state.action);
  const pastHistory = useWhiteboardUndoRedoStore((state) => state.past);
  const futureHistory = useWhiteboardUndoRedoStore((state) => state.future);
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const whiteboardNodes = nodes.filter((n) => n.type === "whiteboard");
  const isWhiteboardEnabled = useDEMOModelerStore(
    (state) => state.isWhiteboardEnabled
  );

  useEffect(() => {
    const undoRedoKeyDownHandler = (event: KeyboardEvent) => {
      if (!isWhiteboardEnabled) return;
      if (
        event.key?.toLowerCase() === "y" &&
        (event.ctrlKey || event.metaKey) &&
        futureHistory.length > 0
      ) {
        redoWhiteboard(whiteboardNodes);
        setUndoAction("redo");
      } else if (
        event.key?.toLowerCase() === "z" &&
        (event.ctrlKey || event.metaKey) &&
        pastHistory.length > 0
      ) {
        undoWhiteboard(whiteboardNodes);
        setUndoAction("redo");
      }
    };

    const undoRedoKeyUpHandler = (e: KeyboardEvent) => {
      if (!isWhiteboardEnabled) return;
      if (undoAction) return;
      if (!e.key) return;
      if (
        e.key.toLowerCase() === "z" ||
        e.key.toLowerCase() === "y" ||
        e.key.toLowerCase() === "control" ||
        e.key.toLowerCase() === "meta"
      ) {
        setUndoAction(null);
      }
    };

    document.addEventListener("keydown", undoRedoKeyDownHandler);
    document.addEventListener("keydown", undoRedoKeyUpHandler);

    return () => {
      document.removeEventListener("keydown", undoRedoKeyDownHandler);
      document.addEventListener("keydown", undoRedoKeyUpHandler);
    };
  }, [
    isWhiteboardEnabled,
    undoWhiteboard,
    redoWhiteboard,
    setUndoAction,
    undoAction,
    pastHistory,
    futureHistory,
  ]);
};

export default useUndoWhiteboardShortcut;
