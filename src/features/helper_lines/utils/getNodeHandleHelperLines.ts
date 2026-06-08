import type { DEMONode } from "$/features/nodes/nodes.types";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";
import { Position } from "@xyflow/react";
import type { HandleChange } from "../types/types";
import getHandleAbsoluteCoordinates from "./getHandleAbsoluteCoordinates";
import type { HandleWithPosition } from "./getConnectedHandlePairs";

// this utility function can be called with a position change (inside onNodesChange)
// it checks all other nodes and calculated the helper line positions and the position where the current node should snap to
interface GetNodeHandleHelperLinesParams {
  change: HandleChange;
  nodes: DEMONode[];
  distance?: number;
}

type GetHelperLinesResult = {
  horizontal?: number;
  vertical?: number;
  snapOffset?: number;
};

export function getNodeHandleHelperLines({
  change,
  nodes,
  distance = 5,
}: GetNodeHandleHelperLinesParams): GetHelperLinesResult {
  const defaultResult = {
    horizontal: undefined,
    vertical: undefined,
    snapOffset: undefined,
  };
  const nodeWithHandleChange = nodes.find((node) => node.id === change.nodeId);

  if (!nodeWithHandleChange) {
    return defaultResult;
  }

  const absoluteHandleCoordinatesForChangedHandle =
    getHandleAbsoluteCoordinates(
      nodeWithHandleChange,
      { handle: { id: "", offset: change.offset }, position: change.position },
      nodes,
    );

  const nodeWithHandleChangeAbsolutePosition =
    convertRelativeToAbsolutePosition(
      nodeWithHandleChange.position,
      nodeWithHandleChange,
      nodes,
    );

  let horizontalDistance = distance;
  let verticalDistance = distance;

  return nodes
    .filter(
      (node) => node.id !== nodeWithHandleChange.id && "handles" in node.data,
    )
    .reduce<GetHelperLinesResult>((result, nodeWithoutHandleChange) => {
      if (!("handles" in nodeWithoutHandleChange.data)) return result;
      const handles = nodeWithoutHandleChange.data.handles;

      const allHandles: HandleWithPosition[] = [
        ...(handles?.top?.handles?.map((handle) => ({
          handle,
          position: Position.Top,
        })) ?? []),
        ...(handles?.bottom?.handles?.map((handle) => ({
          handle,
          position: Position.Bottom,
        })) ?? []),
        ...(handles?.left?.handles?.map((handle) => ({
          handle,
          position: Position.Left,
        })) ?? []),
        ...(handles?.right?.handles?.map((handle) => ({
          handle,
          position: Position.Right,
        })) ?? []),
      ];

      return allHandles.reduce<GetHelperLinesResult>((handleResult, handle) => {
        const absoluteHandleCoordinatesForUnchangedHandle =
          getHandleAbsoluteCoordinates(nodeWithoutHandleChange, handle, nodes);

        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|
        //        |
        //        |
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     B     |
        //  |___________|

        const distanceCenterVertical = Math.abs(
          (absoluteHandleCoordinatesForUnchangedHandle?.x ?? 0) -
            (absoluteHandleCoordinatesForChangedHandle?.x ?? 0),
        );

        if (distanceCenterVertical < verticalDistance) {
          handleResult.vertical = absoluteHandleCoordinatesForUnchangedHandle.x;
          handleResult.snapOffset =
            ((absoluteHandleCoordinatesForUnchangedHandle.x ?? 0) -
              (nodeWithHandleChangeAbsolutePosition.x ?? 0)) /
            (nodeWithHandleChange.measured?.width ?? 0);
          verticalDistance = distanceCenterVertical;
        }

        //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
        //  |    A    |-----|    B    |
        //  |_________|     |_________|

        const distanceCenterHorizontal = Math.abs(
          (absoluteHandleCoordinatesForUnchangedHandle?.y ?? 0) -
            (absoluteHandleCoordinatesForChangedHandle?.y ?? 0),
        );

        if (distanceCenterHorizontal < horizontalDistance) {
          handleResult.horizontal =
            absoluteHandleCoordinatesForUnchangedHandle.y;
          handleResult.snapOffset =
            ((absoluteHandleCoordinatesForUnchangedHandle.y ?? 0) -
              (nodeWithHandleChangeAbsolutePosition.y ?? 0)) /
            (nodeWithHandleChange.measured?.height ?? 0);
          horizontalDistance = distanceCenterHorizontal;
        }

        return handleResult;
      }, result);
    }, defaultResult);
}
