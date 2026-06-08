import { Position } from "@xyflow/react";
import type { HandleWithPosition } from "./getConnectedHandlePairs";
import type { DEMONode } from "$/features/nodes/nodes.types";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";

const getHandleAbsoluteCoordinates = (
  node: DEMONode,
  hwp: HandleWithPosition,
  nodes: DEMONode[],
) => {
  const bounds = {
    left: node.position.x ?? 0,
    right: (node.position.x ?? 0) + (node.measured?.width ?? 0),
    top: node.position.y ?? 0,
    bottom: (node.position.y ?? 0) + (node.measured?.height ?? 0),
    width: node.measured?.width ?? 0,
    height: node.measured?.height ?? 0,
  };
  const nodeBoundPosition = bounds[hwp.position];
  const relativeCoords = {
    x:
      hwp.position === Position.Left || hwp.position === Position.Right
        ? nodeBoundPosition
        : bounds.width * hwp.handle.offset + node.position.x,
    y:
      hwp.position === Position.Top || hwp.position === Position.Bottom
        ? nodeBoundPosition
        : bounds.height * hwp.handle.offset + node.position.y,
  };
  return convertRelativeToAbsolutePosition(relativeCoords, node, nodes);
};
export default getHandleAbsoluteCoordinates;
