import { useEffect } from "react";

import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import {
  redoPoints,
  setHistoryAction,
  undoPoints,
  useDrawStore,
} from "../store/useDrawStore";

const useDrawHistoryShortcut = () => {
  const undoAction = useDrawStore((state) => state.historyAction);
  const pastHistory = useDrawStore((state) => state.pastPoints);
  const futureHistory = useDrawStore((state) => state.futurePoints);
  const points = useDrawStore((state) => state.points);
  const action = useDEMOModelerStore((state) => state.action);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (action !== "draw") return;
      if (
        event.key?.toLowerCase() === "y" &&
        (event.ctrlKey || event.metaKey) &&
        futureHistory.length > 0
      ) {
        redoPoints(points);
        setHistoryAction("redo");
      } else if (
        event.key?.toLowerCase() === "z" &&
        (event.ctrlKey || event.metaKey) &&
        pastHistory.length > 0
      ) {
        undoPoints(points);
        setHistoryAction("undo");
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (action !== "draw") return;
      if (undoAction) return;
      if (!e.key) return;
      if (
        e.key.toLowerCase() === "z" ||
        e.key.toLowerCase() === "y" ||
        e.key.toLowerCase() === "control" ||
        e.key.toLowerCase() === "meta"
      ) {
        setHistoryAction(null);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keydown", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.addEventListener("keydown", keyUpHandler);
    };
  }, [setHistoryAction, undoAction, pastHistory, futureHistory]);
};

export default useDrawHistoryShortcut;
