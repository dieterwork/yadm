import useCopyPasteShortcut from "../actions/copy_paste/useCopyPasteShortcut";
import useDeleteShortcut from "../actions/delete/useDeleteShortcut";
import useLockShortcut from "../actions/lock/useLockShortcut";
import useSaveShortcut from "../actions/save/useSaveShortcut";
import useUndoRedoShortcut from "../actions/undo_redo/useUndoRedoShortcut";
import useZoomShortcut from "../actions/zoom/useZoomShortcut";
import useEditShortcut from "../editable_content/useEditableContentShortcut";
import usePreviewNodeShortcut from "../preview_node/usePreviewNodeShortcut";

const useKeyboardShortcuts = () => {
  useCopyPasteShortcut();
  useDeleteShortcut();
  useEditShortcut();
  usePreviewNodeShortcut();
  useUndoRedoShortcut();
  useSaveShortcut();
  useLockShortcut();
  useZoomShortcut();
};

export default useKeyboardShortcuts;
