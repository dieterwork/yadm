export const walkThroughNodes = (
  node: Node,
  func: (node: Node) => boolean | void
): boolean | void => {
  let result = func(node);
  for (
    let child = node.firstChild;
    result !== false && child;
    child = child.nextSibling
  ) {
    result = walkThroughNodes(child, func);
  }
  return result;
};
