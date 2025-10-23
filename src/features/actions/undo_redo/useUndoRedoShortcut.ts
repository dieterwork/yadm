import useShortcut from "$/features/keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import toast from "react-hot-toast/headless";

const useUndoRedoShortcut = () => {
  const { undo, redo } = useDEMOModelerStore.temporal.getState();

  useShortcut(["Control+z"], () => {
    undo();
  });
  useShortcut(["Control+y"], () => {
    redo();
  });
};

export default useUndoRedoShortcut;
