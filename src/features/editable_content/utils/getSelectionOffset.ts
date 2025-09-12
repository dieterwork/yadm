import { getAbsoluteOffset } from "./getAbsoluteOffset";
import { searchNode } from "./searchNode";

export function getSelectionOffset(container: Node): [number, number] {
  let start = 0;
  let end = 0;

  const selection = window.getSelection();
  if (!selection) throw new Error("Selection not found");
  for (let i = 0, len = selection.rangeCount; i < len; i++) {
    const range = selection.getRangeAt(i);
    if (range.intersectsNode(container)) {
      const startNode = range.startContainer;
      searchNode(container, container, (node) => {
        if (startNode === node) {
          start += getAbsoluteOffset(node, range.startOffset);
          return true;
        }

        const dataLength =
          node.nodeType === Node.TEXT_NODE ? (node as Text).data.length : 0;

        start += dataLength;
        end += dataLength;

        return false;
      });

      const endNode = range.endContainer;
      searchNode(container, startNode, (node) => {
        if (endNode === node) {
          end += getAbsoluteOffset(node, range.endOffset);
          return true;
        }

        const dataLength =
          node.nodeType === Node.TEXT_NODE ? (node as Text).data.length : 0;

        end += dataLength;

        return false;
      });

      break;
    }
  }

  return [start, end];
}
