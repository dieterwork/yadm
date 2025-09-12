import { createRange } from "./createRange";

export const setSelectionOffset = (node: Node, start: number, end: number) => {
  const range = createRange(node, start, end);
  const selection = window.getSelection();
  if (!selection) throw new Error("Selection not found");
  selection.removeAllRanges();
  selection.addRange(range);
};
