import useDelete from "./useDelete";
import useShortcut from "../../keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";

const useDeleteShortcut = () => {
  const { deleteNode, deleteEdge } = useDelete();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  useShortcut(["Meta+d", "Control+d", "Delete"], () => {
    if (!isEnabled) return;
    deleteNode();
    deleteEdge();
  });
};
export default useDeleteShortcut;
