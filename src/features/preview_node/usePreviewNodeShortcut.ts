import { resetPreviewNode } from "./usePreviewNodeStore";
import useShortcut from "../keyboard/useShortcut";
import { useDEMOModelerStore } from "../modeler/useDEMOModelerStore";

export default function usePreviewNodeShortcut() {
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  useShortcut("Escape", () => {
    if (!isEnabled) return;
    resetPreviewNode();
  });
}
