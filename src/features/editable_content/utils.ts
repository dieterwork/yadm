import type { KeyboardEvent } from "react";

const nodeWalk = (node, func) => {
  let result = func(node);
  for (
    node = node.firstChild;
    result !== false && node;
    node = node.nextSibling
  )
    result = nodeWalk(node, func);
  return result;
};

export const getCaretPosition = (elem: HTMLElement) => {
  const sel = window.getSelection();
  if (!sel) throw new Error("Selection not found");
  var cum_length = [0, 0];

  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.focusOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.focusNode];
    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.focusNode))
      return undefined;
    else {
      var found = [0, 0];
      var i;
      nodeWalk(elem, function (node) {
        for (i = 0; i < 2; i++) {
          if (node == nodes_to_find[i]) {
            found[i] = true;
            if (found[i == 0 ? 1 : 0]) return false; // all done
          }
        }

        if (node.textContent && !node.firstChild) {
          for (i = 0; i < 2; i++) {
            if (!found[i]) cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.focusOffset;
    }
  }
  if (cum_length[0] <= cum_length[1]) return cum_length;
  return [cum_length[1], cum_length[0]];
};

export const getCurrentFocusedText = (node: HTMLElement) => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  if (!selection || !range) return null;

  selection.modify("move", "backward", "lineboundary");
  selection.modify("extend", "forward", "lineboundary");

  const html = document.createElement("div");

  for (let i = 0; i < selection.rangeCount; i++) {
    html.appendChild(selection.getRangeAt(i).cloneContents());
  }

  selection.removeAllRanges();
  selection.addRange(range);

  const innerHTML = html.innerHTML;
  html.remove();
  return innerHTML;
};

/** return true if node found */
function searchNode(
  container: Node,
  startNode: Node,
  predicate: (node: Node) => boolean,
  excludeSibling?: boolean
): boolean {
  if (predicate(startNode as Text)) {
    return true;
  }

  for (let i = 0, len = startNode.childNodes.length; i < len; i++) {
    if (searchNode(startNode, startNode.childNodes[i], predicate, true)) {
      return true;
    }
  }

  if (!excludeSibling) {
    let parentNode = startNode;
    while (parentNode && parentNode !== container) {
      let nextSibling = parentNode.nextSibling;
      while (nextSibling) {
        if (searchNode(container, nextSibling, predicate, true)) {
          return true;
        }
        nextSibling = nextSibling.nextSibling;
      }
      parentNode = parentNode.parentNode;
    }
  }

  return false;
}

function createRange(container: Node, start: number, end: number): Range {
  let startNode;
  searchNode(container, container, (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const dataLength = (node as Text).data.length;
      if (start <= dataLength) {
        startNode = node;
        return true;
      }
      start -= dataLength;
      end -= dataLength;
      return false;
    }
  });

  let endNode;
  if (startNode) {
    searchNode(container, startNode, (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const dataLength = (node as Text).data.length;
        if (end <= dataLength) {
          endNode = node;
          return true;
        }
        end -= dataLength;
        return false;
      }
    });
  }

  const range = document.createRange();
  if (startNode) {
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

  if (endNode) {
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
}

export function setSelectionOffset(node: Node, start: number, end: number) {
  const range = createRange(node, start, end);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function hasChild(container: Node, node: Node): boolean {
  while (node) {
    if (node === container) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

function getAbsoluteOffset(container: Node, offset: number) {
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
}

export function getSelectionOffset(container: Node): [number, number] {
  let start = 0;
  let end = 0;

  const selection = window.getSelection();
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

export function getInnerText(container: Node) {
  const buffer = [];
  searchNode(container, container, (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      buffer.push((node as Text).data);
    }
    return false;
  });
  return buffer.join("");
}

export const toggleBoldText = (e: KeyboardEvent<HTMLDivElement>) => {
  e.preventDefault();
  const target = e.currentTarget;
  if (!(target instanceof Node)) throw new Error("Target is not a node");
  const text = getCurrentFocusedText(target);
  // get current selection
  const [start, end] = getSelectionOffset(target);
  if (!text) throw new Error("Could not find text");
  const elements = target.querySelectorAll("*");
  if (elements.length === 0) {
    // must be inner text
    target.innerHTML = "<b>" + target.innerText + "</b>";
  }
  let currentEl: HTMLElement | null = null;
  for (const el of elements) {
    if (!(el instanceof Node))
      throw new Error("Element is not an HTML element");
    if (el.innerText.trim() === text.trim()) {
      currentEl = el;
    }
  }
  if (!currentEl) return;
  if (currentEl?.nodeName === "B") {
    const parentDiv = currentEl.parentNode;
    if (!parentDiv) return;
    parentDiv.innerHTML = text;
  } else if (currentEl.nodeName === "DIV") {
    currentEl.innerHTML = "<b>" + text + "</b>";
  }
  setSelectionOffset(target, start, end);
};

export const setMaxLength = (
  e: KeyboardEvent<HTMLDivElement>,
  maxLength: number
) => {
  const target = e.currentTarget;
  if (!(target instanceof Node)) throw new Error("Target is not a node");
  if (
    target.innerText.length >= maxLength &&
    e.key !== "Backspace" &&
    e.key !== "Delete"
  ) {
    e.preventDefault();
    return;
  }
};
