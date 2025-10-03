import useShortcut from "$/features/keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";

const useUndoRedoShortcut = () => {
  const { undo, redo } = useDEMOModelerStore.temporal.getState();

  useShortcut(["Control+z"], () => undo());
  useShortcut(["Control+y"], () => redo());
};

export default useUndoRedoShortcut;
