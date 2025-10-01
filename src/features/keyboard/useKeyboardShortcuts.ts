import useCopyPasteShortcut from "../actions/copy_paste/useCopyPasteShortcut";
import useDeleteShortcut from "../actions/delete/useDeleteShortcut";
import useUndoRedoShortcut from "../actions/undo_redo/useUndoRedoShortcut";
import useEditShortcut from "../editable_content/useEditableContentShortcut";
import usePreviewNodeShortcut from "../preview_node/usePreviewNodeShortcut";

const useKeyboardShortcuts = () => {
  useCopyPasteShortcut();
  useDeleteShortcut();
  useEditShortcut();
  usePreviewNodeShortcut();
  useUndoRedoShortcut();
};

export default useKeyboardShortcuts;
