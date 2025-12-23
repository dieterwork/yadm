import useShortcut from "$/features/keyboard/useShortcut";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { resetAttach } from "./useAttachStore";

export default function usePreviewNodeShortcut() {
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  useShortcut("Escape", () => {
    if (!isEnabled) return;
    resetAttach();
  });
}
