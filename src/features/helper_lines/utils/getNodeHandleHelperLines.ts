import type { DEMOHandle, DEMONode } from "$/features/nodes/nodes.types";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";
import type { HandleChange } from "../types/types";

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

  const nodeWithHandleChangeRelativeBounds = {
    left: nodeWithHandleChange.position.x ?? 0,
    right:
      (nodeWithHandleChange.position.x ?? 0) +
      (nodeWithHandleChange.measured?.width ?? 0),
    top: nodeWithHandleChange.position.y ?? 0,
    bottom:
      (nodeWithHandleChange.position.y ?? 0) +
      (nodeWithHandleChange.measured?.height ?? 0),
    width: nodeWithHandleChange.measured?.width ?? 0,
    height: nodeWithHandleChange.measured?.height ?? 0,
  };

  const nodeBoundPosition = nodeWithHandleChangeRelativeBounds[change.position];

  const relativeChangedHandleCoordinates = {
    x:
      change.position === "left" || change.position === "right"
        ? nodeBoundPosition
        : nodeWithHandleChangeRelativeBounds.width * change.offset +
          nodeWithHandleChange.position.x,
    y:
      change.position === "top" || change.position === "bottom"
        ? nodeBoundPosition
        : nodeWithHandleChangeRelativeBounds.height * change.offset +
          nodeWithHandleChange.position.y,
  };

  const absoluteHandleCoordinatesForChangedHandle =
    convertRelativeToAbsolutePosition(
      relativeChangedHandleCoordinates,
      nodeWithHandleChange,
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
      const nodeWithoutHandleChangeRelativeBounds = {
        left: nodeWithoutHandleChange.position.x ?? 0,
        right:
          (nodeWithoutHandleChange.position.x ?? 0) +
          (nodeWithoutHandleChange.measured?.width ?? 0),
        top: nodeWithoutHandleChange.position.y ?? 0,
        bottom:
          (nodeWithoutHandleChange.position.y ?? 0) +
          (nodeWithoutHandleChange.measured?.height ?? 0),
        width: nodeWithoutHandleChange.measured?.width ?? 0,
        height: nodeWithoutHandleChange.measured?.height ?? 0,
      };

      const topHandles: { handle: DEMOHandle; position: "top" }[] =
        handles?.top?.handles?.map((handle) => ({
          handle,
          position: "top",
        })) ?? [];

      const bottomHandles: { handle: DEMOHandle; position: "bottom" }[] =
        handles?.bottom?.handles?.map((handle) => ({
          handle,
          position: "bottom",
        })) ?? [];

      const leftHandles: { handle: DEMOHandle; position: "left" }[] =
        handles?.left?.handles?.map((handle) => ({
          handle,
          position: "left",
        })) ?? [];

      const rightHandles: { handle: DEMOHandle; position: "right" }[] =
        handles?.right?.handles?.map((handle) => ({
          handle,
          position: "right",
        })) ?? [];

      const allHandles = [
        ...topHandles,
        ...bottomHandles,
        ...leftHandles,
        ...rightHandles,
      ];

      return allHandles.reduce<GetHelperLinesResult>((handleResult, handle) => {
        const nodeBoundPosition =
          nodeWithoutHandleChangeRelativeBounds[handle.position];

        const relativeUnchangedHandleCoordinates = {
          x:
            handle.position === "left" || handle.position === "right"
              ? nodeBoundPosition
              : nodeWithoutHandleChangeRelativeBounds.width *
                  handle.handle.offset +
                nodeWithoutHandleChange.position.x,
          y:
            handle.position === "top" || handle.position === "bottom"
              ? nodeBoundPosition
              : nodeWithoutHandleChangeRelativeBounds.height *
                  handle.handle.offset +
                nodeWithoutHandleChange.position.y,
        };

        const absoluteHandleCoordinatesForUnchangedHandle =
          convertRelativeToAbsolutePosition(
            relativeUnchangedHandleCoordinates,
            nodeWithoutHandleChange,
            nodes,
          );
        const nodeWithoutHandleChangeAbsolutePosition =
          convertRelativeToAbsolutePosition(
            nodeWithoutHandleChange.position,
            nodeWithoutHandleChange,
            nodes,
          );

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
            Math.abs(
              (nodeWithHandleChangeAbsolutePosition.x ?? 0) -
                (absoluteHandleCoordinatesForUnchangedHandle.x ?? 0),
            ) / nodeWithoutHandleChangeRelativeBounds.width;
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
            Math.abs(
              (nodeWithHandleChangeAbsolutePosition.y ?? 0) -
                (absoluteHandleCoordinatesForUnchangedHandle.y ?? 0),
            ) / nodeWithoutHandleChangeRelativeBounds.height;
          horizontalDistance = distanceCenterHorizontal;
        }

        return handleResult;
      }, result);
    }, defaultResult);
}
