/** return true if node found */
export const searchNode = (
  container: Node,
  startNode: Node,
  predicate: (node: Node) => boolean,
  excludeSibling?: boolean
): boolean => {
  if (predicate(startNode as Text)) {
    return true;
  }

  for (let i = 0, len = startNode.childNodes.length; i < len; i++) {
    if (searchNode(startNode, startNode.childNodes[i], predicate, true)) {
      return true;
    }
  }

  if (!excludeSibling) {
    let parentNode: ParentNode | null = startNode as ParentNode;
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
};
