import useDelete from "./useDelete";
import useShortcut from "../../keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";

const useDeleteShortcut = () => {
  const { deleteNode, deleteEdge } = useDelete();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  useShortcut(["Meta+d", "Control+d", "Delete", "Backspace"], () => {
    if (!isEnabled) return;
    deleteNode();
    deleteEdge();
  });
};
export default useDeleteShortcut;
