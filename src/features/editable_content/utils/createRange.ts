import { searchNode } from "./searchNode";

export const createRange = (
  container: Node,
  start: number,
  end: number
): Range => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let startNode: any;
  searchNode(container, container, (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const dataLength = (node as Text).data.length;
      if (start <= dataLength) {
        startNode = node as Text;
        return true;
      }
      start -= dataLength;
      end -= dataLength;
      return false;
    }
    return false;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let endNode: any;
  if (startNode) {
    searchNode(container, startNode, (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const dataLength = (node as Text).data.length;
        if (end <= dataLength) {
          endNode = node as Text;
          return true;
        }
        end -= dataLength;
        return false;
      }
      return false;
    });
  }

  const range = document.createRange();
  if (startNode && startNode instanceof Text) {
    if (start < startNode.data.length) {
      range.setStart(startNode, start);
    } else {
      range.setStartAfter(startNode);
    }
  } else {
    if (start === 0) {
      range.setStart(container, 0);
    } else {
      range.setStartAfter(container);
    }
  }

  if (endNode && endNode instanceof Text) {
    if (end < endNode.data.length) {
      range.setEnd(endNode, end);
    } else {
      range.setEndAfter(endNode);
    }
  } else {
    if (end === 0) {
      range.setEnd(container, 0);
    } else {
      range.setEndAfter(container);
    }
  }

  return range;
};
