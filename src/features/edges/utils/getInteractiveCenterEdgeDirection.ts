import type { Position, XYPosition } from "@xyflow/react";
import { getDirection, handleDirections } from "./smoothStep";

const getInteractiveCenterEdgeDirection = ({
  sourcePosition,
  targetPosition,
  source,
  target,
  offset,
}: {
  sourcePosition: Position;
  targetPosition: Position;
  source: XYPosition;
  target: XYPosition;
  offset: number;
}) => {
  const sourceDir = handleDirections[sourcePosition];
  const targetDir = handleDirections[targetPosition];
  const sourceGapped: XYPosition = {
    x: source.x + sourceDir.x * offset,
    y: source.y + sourceDir.y * offset,
  };
  const targetGapped: XYPosition = {
    x: target.x + targetDir.x * offset,
    y: target.y + targetDir.y * offset,
  };
  const dir = getDirection({
    source: sourceGapped,
    sourcePosition,
    target: targetGapped,
  });
  const dirAccessor = dir.x !== 0 ? "x" : "y";
  const currDir = dir[dirAccessor];

  // opposite handle positions, default case
  if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    if (sourceDir[dirAccessor] === currDir) {
      return dirAccessor === "x" ? "horizontal" : "vertical";
    } else {
      return dirAccessor === "x" ? "vertical" : "horizontal";
    }
  } else {
    return undefined;
  }
};

export default getInteractiveCenterEdgeDirection;
