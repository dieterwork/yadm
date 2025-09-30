import type { InternalNode } from "@xyflow/react";

const nodeToBox = (node: InternalNode) => {
  const x = node.internals.positionAbsolute.x;
  const y = node.internals.positionAbsolute.y;
  return {
    x,
    y,
    x2: x + (node.measured?.width ?? node.width ?? node.initialWidth ?? 0),
    y2: y + (node.measured?.height ?? node.height ?? node.initialHeight ?? 0),
  };
};

export default nodeToBox;
