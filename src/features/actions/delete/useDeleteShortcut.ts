import useDelete from "./useDelete";
import useShortcut from "../../keyboard/useShortcut";

const useDeleteShortcut = () => {
  const { deleteNode, deleteEdge } = useDelete();
  useShortcut(["Meta+d", "Control+d"], () => {
    deleteNode();
    deleteEdge();
  });
};
export default useDeleteShortcut;
