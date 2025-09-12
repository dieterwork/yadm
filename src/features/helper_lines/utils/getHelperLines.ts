import type { DEMONode } from "$/features/nodes/nodes.types";
import type { NodePositionChange, XYPosition } from "@xyflow/react";
import filterNodesAvailableForHelperLines from "./filterNodesAvailableForHelperLines";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";

type GetHelperLinesResult = {
  horizontal?: number;
  vertical?: number;
  snapPosition: Partial<XYPosition>;
};

// this utility function can be called with a position change (inside onNodesChange)
// it checks all other nodes and calculated the helper line positions and the position where the current node should snap to
interface GetHelperLinesParams {
  change: NodePositionChange;
  nodes: DEMONode[];
  distance?: number;
}
export function getHelperLines({
  change,
  nodes,
  distance = 5,
}: GetHelperLinesParams): GetHelperLinesResult {
  const defaultResult = {
    horizontal: undefined,
    vertical: undefined,
    snapPosition: { x: undefined, y: undefined },
  };
  const nodeA = nodes.find((node) => node.id === change.id);

  if (!nodeA || !change.position) {
    return defaultResult;
  }

  const absoluteCoordinates = convertRelativeToAbsolutePosition(
    change.position,
    nodeA,
    nodes
  );

  const nodeABounds = {
    left: absoluteCoordinates.x ?? 0,
    right: (absoluteCoordinates.x ?? 0) + (nodeA.measured?.width ?? 0),
    top: absoluteCoordinates.y ?? 0,
    bottom: (absoluteCoordinates.y ?? 0) + (nodeA.measured?.height ?? 0),
    width: nodeA.measured?.width ?? 0,
    height: nodeA.measured?.height ?? 0,
  };

  let horizontalDistance = distance;
  let verticalDistance = distance;

  return nodes
    .filter(
      (node) =>
        node.id !== nodeA.id && filterNodesAvailableForHelperLines(nodeA, node)
    )
    .reduce<GetHelperLinesResult>((result, nodeB) => {
      const absoluteCoordinates = convertRelativeToAbsolutePosition(
        nodeB.position,
        nodeB,
        nodes
      );
      const nodeBBounds = {
        left: absoluteCoordinates.x ?? 0,
        right: (absoluteCoordinates.x ?? 0) + (nodeB.measured?.width ?? 0),
        top: absoluteCoordinates.y ?? 0,
        bottom: (absoluteCoordinates.y ?? 0) + (nodeB.measured?.height ?? 0),
        width: nodeB.measured?.width ?? 0,
        height: nodeB.measured?.height ?? 0,
      };

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //  |
      //  |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left);

      if (distanceLeftLeft < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left;
        result.vertical = nodeBBounds.left;
        verticalDistance = distanceLeftLeft;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //              |
      //              |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceRightRight = Math.abs(
        nodeABounds.right - nodeBBounds.right
      );

      if (distanceRightRight < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right - nodeABounds.width;
        result.vertical = nodeBBounds.right;
        verticalDistance = distanceRightRight;
      }

      //              |‾‾‾‾‾‾‾‾‾‾‾|
      //              |     A     |
      //              |___________|
      //              |
      //              |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceLeftRight = Math.abs(nodeABounds.left - nodeBBounds.right);

      if (distanceLeftRight < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right;
        result.vertical = nodeBBounds.right;
        verticalDistance = distanceLeftRight;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //              |
      //              |
      //              |‾‾‾‾‾‾‾‾‾‾‾|
      //              |     B     |
      //              |___________|
      const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left);

      if (distanceRightLeft < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
        result.vertical = nodeBBounds.left;
        verticalDistance = distanceRightLeft;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |     |     B     |
      //  |___________|     |___________|
      const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top);

      if (distanceTopTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top;
        result.horizontal = nodeBBounds.top;
        horizontalDistance = distanceTopTop;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|_________________
      //                    |           |
      //                    |     B     |
      //                    |___________|
      const distanceBottomTop = Math.abs(nodeABounds.bottom - nodeBBounds.top);

      if (distanceBottomTop < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top - nodeABounds.height;
        result.horizontal = nodeBBounds.top;
        horizontalDistance = distanceBottomTop;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |     |     B     |
      //  |___________|_____|___________|
      const distanceBottomBottom = Math.abs(
        nodeABounds.bottom - nodeBBounds.bottom
      );

      if (distanceBottomBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height;
        result.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceBottomBottom;
      }

      //                    |‾‾‾‾‾‾‾‾‾‾‾|
      //                    |     B     |
      //                    |           |
      //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      //  |     A     |
      //  |___________|
      const distanceTopBottom = Math.abs(nodeABounds.top - nodeBBounds.bottom);

      if (distanceTopBottom < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom;
        result.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceTopBottom;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //        |
      //        |
      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     B     |
      //  |___________|
      const distanceCenterVertical = Math.abs(
        nodeABounds.left +
          nodeABounds.width / 2 -
          (nodeBBounds.left + nodeBBounds.width / 2)
      );

      if (distanceCenterVertical < verticalDistance) {
        result.snapPosition.x =
          nodeBBounds.left + nodeBBounds.width / 2 - nodeABounds.width / 2;
        result.vertical = nodeBBounds.left + nodeBBounds.width / 2;
        verticalDistance = distanceCenterVertical;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |    A    |-----|    B    |
      //  |_________|     |_________|

      const distanceCenterHorizontal = Math.abs(
        nodeABounds.top +
          nodeABounds.height / 2 -
          (nodeBBounds.top + nodeBBounds.height / 2)
      );

      if (distanceCenterHorizontal < horizontalDistance) {
        result.snapPosition.y =
          nodeBBounds.top + nodeBBounds.height / 2 - nodeABounds.height / 2;
        result.horizontal = nodeBBounds.top + nodeBBounds.height / 2;
        horizontalDistance = distanceCenterHorizontal;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |    A    |‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |_________|     |    B    |
      //                  |_________|

      const distanceCenterTopHorizontal = Math.abs(
        nodeABounds.top + nodeABounds.height / 2 - nodeBBounds.top
      );

      if (distanceCenterTopHorizontal < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.top - nodeABounds.height / 2;
        result.horizontal = nodeBBounds.top;
        horizontalDistance = distanceCenterTopHorizontal;
      }

      //                  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
      //  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|     |    B    |
      //  |    A    |_____|_________|
      //  |_________|

      const distanceCenterBottomHorizontal = Math.abs(
        nodeABounds.top + nodeABounds.height / 2 - nodeBBounds.bottom
      );

      if (distanceCenterBottomHorizontal < horizontalDistance) {
        result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height / 2;
        result.horizontal = nodeBBounds.bottom;
        horizontalDistance = distanceCenterBottomHorizontal;
      }

      //  |‾‾‾‾‾‾‾‾‾‾‾|
      //  |     A     |
      //  |___________|
      //         |
      //         |
      //         |‾‾‾‾‾‾‾‾‾‾‾|
      //         |     B     |
      //         |___________|
      const distanceCenterLeftVertical = Math.abs(
        nodeABounds.left + nodeABounds.width / 2 - nodeBBounds.left
      );

      if (distanceCenterLeftVertical < verticalDistance) {
        result.snapPosition.x = nodeBBounds.left - nodeABounds.width / 2;
        result.vertical = nodeBBounds.left;
        verticalDistance = distanceCenterLeftVertical;
      }

      //               |‾‾‾‾‾‾‾‾‾‾‾|
      //               |     A     |
      //               |___________|
      //                     |
      //                     |
      //         |‾‾‾‾‾‾‾‾‾‾‾     |
      //         |     B     |
      //         |___________|
      const distanceCenterRightVertical = Math.abs(
        nodeABounds.left + nodeABounds.width / 2 - nodeBBounds.right
      );

      if (distanceCenterRightVertical < verticalDistance) {
        result.snapPosition.x = nodeBBounds.right - nodeABounds.width / 2;
        result.vertical = nodeBBounds.right;
        verticalDistance = distanceCenterRightVertical;
      }

      return result;
    }, defaultResult);
}
