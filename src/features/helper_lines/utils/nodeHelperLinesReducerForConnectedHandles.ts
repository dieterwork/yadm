import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { Position, type XYPosition } from "@xyflow/react";
import getConnectedHandlePairs, {
  type HandleWithPosition,
} from "./getConnectedHandlePairs";
import type { GetHelperLinesResult } from "./getNodeHelperLines";
import getHandleAbsoluteCoordinates from "./getHandleAbsoluteCoordinates";

type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};
const nodeHelperLinesReducerForConnectedHandles = ({
  result,
  nodeA,
  nodeB,
  nodeAAbsolutePosition,
  nodes,
  edges,
  verticalDistance,
  horizontalDistance,
}: {
  result: GetHelperLinesResult;
  nodeA: DEMONode;
  nodeB: DEMONode;
  nodeAAbsolutePosition: Partial<XYPosition>;
  nodes: DEMONode[];
  edges: DEMOEdge[];
  verticalDistance: number;
  horizontalDistance: number;
}) => {
  if (!("handles" in nodeA.data) || !("handles" in nodeB.data)) return result;

  const nodeAHandles = nodeA.data.handles;
  const nodeBHandles = nodeB.data.handles;

  const topHandlesNodeA =
    nodeAHandles?.top?.handles?.map((handle) => ({
      handle,
      position: Position.Top,
    })) ?? [];

  const bottomHandlesNodeA =
    nodeAHandles?.bottom?.handles?.map((handle) => ({
      handle,
      position: Position.Bottom,
    })) ?? [];

  const leftHandlesNodeA =
    nodeAHandles?.left?.handles?.map((handle) => ({
      handle,
      position: Position.Left,
    })) ?? [];

  const rightHandlesNodeA =
    nodeAHandles?.right?.handles?.map((handle) => ({
      handle,
      position: Position.Right,
    })) ?? [];

  const topHandlesNodeB =
    nodeBHandles?.top?.handles?.map((handle) => ({
      handle,
      position: Position.Top,
    })) ?? [];

  const bottomHandlesNodeB =
    nodeBHandles?.bottom?.handles?.map((handle) => ({
      handle,
      position: Position.Bottom,
    })) ?? [];

  const leftHandlesNodeB =
    nodeBHandles?.left?.handles?.map((handle) => ({
      handle,
      position: Position.Left,
    })) ?? [];

  const rightHandlesNodeB =
    nodeBHandles?.right?.handles?.map((handle) => ({
      handle,
      position: Position.Right,
    })) ?? [];

  const allHandlesNodeA: HandleWithPosition[] = [
    ...topHandlesNodeA,
    ...bottomHandlesNodeA,
    ...leftHandlesNodeA,
    ...rightHandlesNodeA,
  ];

  const allHandlesNodeB: HandleWithPosition[] = [
    ...topHandlesNodeB,
    ...bottomHandlesNodeB,
    ...leftHandlesNodeB,
    ...rightHandlesNodeB,
  ];

  const connectedHandlePairs = getConnectedHandlePairs(
    nodeA.id,
    allHandlesNodeA,
    nodeAAbsolutePosition,
    { width: nodeA.measured?.width ?? 0, height: nodeA.measured?.height ?? 0 },
    nodeB.id,
    allHandlesNodeB,
    edges,
  );

  return connectedHandlePairs.reduce<GetHelperLinesResult>(
    (connectedHandlePairsResult, pair) => {
      const nodeASourceAbsoluteCoordinates = pair.sourceXY;
      const nodeBTargetAbsoluteCoordinates = getHandleAbsoluteCoordinates(
        nodeB,
        pair.target,
        nodes,
      );

      const distanceCenterVertical = Math.abs(
        (nodeBTargetAbsoluteCoordinates?.x ?? 0) -
          (nodeASourceAbsoluteCoordinates?.x ?? 0),
      );

      if (distanceCenterVertical < verticalDistance) {
        connectedHandlePairsResult.vertical = nodeBTargetAbsoluteCoordinates?.x;
        connectedHandlePairsResult.snapPosition.x =
          (nodeAAbsolutePosition.x ?? 0) +
          (nodeBTargetAbsoluteCoordinates.x ?? 0) -
          (nodeASourceAbsoluteCoordinates.x ?? 0);

        verticalDistance = distanceCenterVertical;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |    A    |-----|    B    |
      //  |_________|     |_________|

      const distanceCenterHorizontal = Math.abs(
        (nodeASourceAbsoluteCoordinates?.y ?? 0) -
          (nodeBTargetAbsoluteCoordinates?.y ?? 0),
      );

      if (distanceCenterHorizontal < horizontalDistance) {
        connectedHandlePairsResult.horizontal =
          nodeBTargetAbsoluteCoordinates?.y;
        connectedHandlePairsResult.snapPosition.y =
          (nodeAAbsolutePosition.y ?? 0) +
          (nodeBTargetAbsoluteCoordinates.y ?? 0) -
          (nodeASourceAbsoluteCoordinates.y ?? 0);
        horizontalDistance = distanceCenterHorizontal;
      }

      return connectedHandlePairsResult;
    },
    result,
  );
};

export default nodeHelperLinesReducerForConnectedHandles;
