export const checkIfNodeHasChild = (container: Node, node: Node): boolean => {
  let nodeCopy: Node | ParentNode | null = node;
  while (nodeCopy) {
    if (nodeCopy === container) {
      return true;
    }
    nodeCopy = nodeCopy.parentNode;
  }

  return false;
};
