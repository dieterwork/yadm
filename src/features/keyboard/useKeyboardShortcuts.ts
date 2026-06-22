import useCopyPasteShortcut from "../actions/copy_paste/useCopyPasteShortcut";
import useDeleteShortcut from "../actions/delete/useDeleteShortcut";
import useLockShortcut from "../actions/lock/useLockShortcut";
import useSaveShortcut from "../actions/save/useSaveShortcut";
import useUndoShortcut from "../actions/undo/useUndoShortcut";
import useZoomShortcut from "../actions/zoom/useZoomShortcut";
import useEditShortcut from "../editable_content/useEditableContentShortcut";
import usePreviewNodeShortcut from "../preview_node/usePreviewNodeShortcut";
import useUndoWhiteboardShortcut from "../whiteboard/hooks/useUndoWhiteboardShortcut";
import useHandleEditModeShortcut from "../connection_handles/useHandleEditModeShortcut";

const useKeyboardShortcuts = () => {
  useCopyPasteShortcut();
  useDeleteShortcut();
  useEditShortcut();
  usePreviewNodeShortcut();
  useUndoShortcut();
  useSaveShortcut();
  useLockShortcut();
  useZoomShortcut();
  usePreviewNodeShortcut();
  useUndoWhiteboardShortcut();
  useHandleEditModeShortcut();
};

export default useKeyboardShortcuts;
