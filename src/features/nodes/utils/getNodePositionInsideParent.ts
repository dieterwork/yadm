import type { Node } from "@xyflow/react";

/** Convert absolute coordinates to parent relative coordinates */
export const convertAbsoluteToParentRelativePosition = ({
  absolutePosition,
  parentAbsolutePosition,
  nodeDimensions,
  parentNode,
}: {
  absolutePosition: { x: number; y: number };
  parentAbsolutePosition: { x: number; y: number };
  nodeDimensions: { width: number; height: number };
  parentNode: Node;
}) => {
  const position = absolutePosition;
  const nodeWidth = nodeDimensions.width ?? 0;
  const nodeHeight = nodeDimensions.height ?? 0;
  const parentWidth = parentNode.measured?.width ?? 0;
  const parentHeight = parentNode.measured?.height ?? 0;

  if (position.x < parentAbsolutePosition.x) {
    position.x = 0;
  } else if (position.x + nodeWidth > parentAbsolutePosition.x + parentWidth) {
    position.x = parentWidth - nodeWidth;
  } else {
    position.x = position.x - parentAbsolutePosition.x;
  }

  if (position.y < parentAbsolutePosition.y) {
    position.y = 0;
  } else if (
    position.y + nodeHeight >
    parentAbsolutePosition.y + parentHeight
  ) {
    position.y = parentHeight - nodeHeight;
  } else {
    position.y = position.y - parentAbsolutePosition.y;
  }

  return position;
};
