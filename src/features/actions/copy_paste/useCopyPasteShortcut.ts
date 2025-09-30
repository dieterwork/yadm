import useCopyPaste from "./useCopyPaste";
import useDelete from "../delete/useDelete";
import useShortcut from "../../keyboard/useShortcut";

const useCopyPasteShortcut = () => {
  const { copy, paste, cut } = useCopyPaste();
  const { deleteNode, deleteEdge } = useDelete();

  useShortcut(["Meta+x", "Control+x"], () => cut);
  useShortcut(["Meta+c", "Control+c"], () => copy);
  useShortcut(["Meta+v", "Control+v"], paste);
  useShortcut(["Meta+d", "Control+d"], () => {
    deleteNode();
    deleteEdge();
  });
};

export default useCopyPasteShortcut;
