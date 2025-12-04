import useShortcut from "$/features/keyboard/useShortcut";
import { resetAttach } from "./useAttachStore";

export default function usePreviewNodeShortcut() {
  useShortcut("Escape", resetAttach);
}
