import type { XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";

const convertAbsoluteToRelativePosition = (
  absolutePosition: Partial<XYPosition>,
  node: DEMONode,
  nodes: DEMONode[],
  isNodeParentNode?: boolean
): Partial<XYPosition> => {
  let x =
    absolutePosition.x &&
    absolutePosition.x - (isNodeParentNode ? node.position.x ?? 0 : 0);
  let y =
    absolutePosition.y &&
    absolutePosition.y - (isNodeParentNode ? node?.position.y : 0);
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
