import type { XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";

const convertAbsoluteToRelativePosition = (
  absolutePosition: Partial<XYPosition>,
  node: DEMONode,
  nodes: DEMONode[]
): Partial<XYPosition> => {
  let x = absolutePosition.x;
  let y = absolutePosition.y;
  let hostNode: DEMONode | undefined = node;

  while (hostNode) {
    hostNode = hostNode.parentId
      ? nodes.find((c) => c.id === hostNode?.parentId)
      : undefined;
    if (hostNode) {
      if (x) {
        x -= hostNode.position.x;
      }
      if (y) {
        y -= hostNode.position.y;
      }
    }
  }
  return {
    x,
    y,
  };
};

export default convertAbsoluteToRelativePosition;
