import { searchNode } from "./searchNode";

export const getAbsoluteOffset = (container: Node, offset: number) => {
  if (container.nodeType === Node.TEXT_NODE) {
    return offset;
  }

  let absoluteOffset = 0;
  for (
    let i = 0, len = Math.min(container.childNodes.length, offset);
    i < len;
    i++
  ) {
    const childNode = container.childNodes[i];
    searchNode(childNode, childNode, (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        absoluteOffset += (node as Text).data.length;
      }
      return false;
    });
  }

  return absoluteOffset;
};
