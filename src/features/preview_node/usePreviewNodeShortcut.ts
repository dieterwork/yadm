import { resetPreviewNode } from "./usePreviewNodeStore";
import useShortcut from "../keyboard/useShortcut";

export default function usePreviewNodeShortcut() {
  useShortcut("Escape", resetPreviewNode);
}
