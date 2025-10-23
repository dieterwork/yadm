import type { Position, XYPosition } from "@xyflow/react";
import { getDirection, handleDirections } from "./smoothStep";

const getArrowDirection = ({
  sourcePosition,
  targetPosition,
  source,
  target,
  offset,
}: {
  sourcePosition: Position;
  targetPosition: Position;
  offset: number;
  source: XYPosition;
  target: XYPosition;
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
  return currDir as 1 | -1;
};

export default getArrowDirection;
