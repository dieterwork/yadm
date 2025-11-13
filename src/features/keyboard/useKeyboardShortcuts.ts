import useCopyPasteShortcut from "../actions/copy_paste/useCopyPasteShortcut";
import useDeleteShortcut from "../actions/delete/useDeleteShortcut";
import useLockShortcut from "../actions/lock/useLockShortcut";
import useSaveShortcut from "../actions/save/useSaveShortcut";
import useUndoShortcut from "../actions/undo/useUndoShortcut";
import useZoomShortcut from "../actions/zoom/useZoomShortcut";
import useEditShortcut from "../editable_content/useEditableContentShortcut";
import usePreviewNodeShortcut from "../preview_node/usePreviewNodeShortcut";

const useKeyboardShortcuts = () => {
  useCopyPasteShortcut();
  useDeleteShortcut();
  useEditShortcut();
  usePreviewNodeShortcut();
  useUndoShortcut();
  useSaveShortcut();
  useLockShortcut();
  useZoomShortcut();
};

export default useKeyboardShortcuts;
