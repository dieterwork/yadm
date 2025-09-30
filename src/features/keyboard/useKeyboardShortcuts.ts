import useCopyPasteShortcut from "../actions/copy_paste/useCopyPasteShortcut";
import useDeleteShortcut from "../actions/delete/useDeleteShortcut";
import useEditShortcut from "../editable_content/useEditableContentShortcut";
import usePreviewNodeShortcut from "../preview_node/usePreviewNodeShortcut";

const useKeyboardShortcuts = () => {
  useCopyPasteShortcut();
  useDeleteShortcut();
  useEditShortcut();
  usePreviewNodeShortcut();
};

export default useKeyboardShortcuts;
