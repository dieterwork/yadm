import type { DEMOHandlesData, DEMONode } from "$/features/nodes/nodes.types";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";
import { Position } from "@xyflow/react";
import type { HandleChange } from "../types/types";
import getHandleAbsoluteCoordinates from "./getHandleAbsoluteCoordinates";
import type { HandleWithPosition } from "./getConnectedHandlePairs";

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

// what a handle can line up with, a handle of another node has both axes, a
// line of the handle's own node only the axis the handle is dragged along
type HelperLineCoordinates = { x?: number; y?: number };

const getAllHandles = (handles?: DEMOHandlesData): HandleWithPosition[] => [
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

export function getNodeHandleHelperLines({
  change,
  nodes,
  distance = 5,
}: GetNodeHandleHelperLinesParams): GetHelperLinesResult {
  const defaultResult: GetHelperLinesResult = {
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

  const isDraggedHorizontally =
    change.position === Position.Top || change.position === Position.Bottom;

  //  |‾‾‾‾‾|‾‾‾‾‾|
  //  |     |     |
  //  |_____|_____|
  //  |     |     |
  //
  // the start, middle and end of the node the handle belongs to are helper
  // lines of their own, so a handle can be placed on them without another
  // node's handle to align to. only the axis the handle is dragged along is
  // checked, the other one cannot move.
  const ownNodeLines: HelperLineCoordinates[] = [0, 0.5, 1].map((ratio) =>
    isDraggedHorizontally
      ? {
          x:
            (nodeWithHandleChangeAbsolutePosition.x ?? 0) +
            (nodeWithHandleChange.measured?.width ?? 0) * ratio,
        }
      : {
          y:
            (nodeWithHandleChangeAbsolutePosition.y ?? 0) +
            (nodeWithHandleChange.measured?.height ?? 0) * ratio,
        },
  );

  return nodes
    .filter((node) => "handles" in node.data)
    .reduce<GetHelperLinesResult>((result, node) => {
      if (!("handles" in node.data)) return result;

      // the handles of the node being changed are left out, they move with the
      // node and lining the dragged handle up with them only stacks the two
      const helperLines: HelperLineCoordinates[] =
        node.id === nodeWithHandleChange.id
          ? ownNodeLines
          : getAllHandles(node.data.handles).map((handle) =>
              getHandleAbsoluteCoordinates(node, handle, nodes),
            );

      return helperLines.reduce<GetHelperLinesResult>((lineResult, line) => {
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|
        //        |
        //        |
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     B     |
        //  |___________|

        if (line.x !== undefined) {
          const distanceCenterVertical = Math.abs(
            line.x - (absoluteHandleCoordinatesForChangedHandle?.x ?? 0),
          );

          if (distanceCenterVertical < verticalDistance) {
            lineResult.vertical = line.x;
            if (isDraggedHorizontally) {
              lineResult.snapOffset =
                (line.x - (nodeWithHandleChangeAbsolutePosition.x ?? 0)) /
                (nodeWithHandleChange.measured?.width ?? 0);
              verticalDistance = distanceCenterVertical;
            }
          }
        }

        //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
        //  |    A    |-----|    B    |
        //  |_________|     |_________|

        if (line.y !== undefined) {
          const distanceCenterHorizontal = Math.abs(
            line.y - (absoluteHandleCoordinatesForChangedHandle?.y ?? 0),
          );

          if (distanceCenterHorizontal < horizontalDistance) {
            lineResult.horizontal = line.y;
            if (!isDraggedHorizontally) {
              lineResult.snapOffset =
                (line.y - (nodeWithHandleChangeAbsolutePosition.y ?? 0)) /
                (nodeWithHandleChange.measured?.height ?? 0);
              horizontalDistance = distanceCenterHorizontal;
            }
          }
        }

        return lineResult;
      }, result);
    }, defaultResult);
}
