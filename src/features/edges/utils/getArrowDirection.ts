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

  if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    if (sourceDir[dirAccessor] === currDir) {
      if (dirAccessor === "x") {
        return { x: 1, y: 0 };
      } else {
        return { x: 0, y: 1 };
      }
    } else {
      if (dirAccessor === "x") {
        return { x: 0, y: 1 };
      } else {
        return { x: 1, y: 0 };
      }
    }
  } else {
    // sourceTarget means we take x from source and y from target, targetSource is the opposite
    const sourceTarget: XYPosition[] = [
      { x: sourceGapped.x, y: targetGapped.y },
    ];
    const targetSource: XYPosition[] = [
      { x: targetGapped.x, y: sourceGapped.y },
    ];

    // these are conditions for handling mixed handle positions like Right -> Bottom for example
    if (sourcePosition !== targetPosition) {
      const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
      const isSameDir =
        sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
      const sourceGtTargetOppo =
        sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
      const sourceLtTargetOppo =
        sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
      const flipSourceTarget =
        (sourceDir[dirAccessor] === 1 &&
          ((!isSameDir && sourceGtTargetOppo) ||
            (isSameDir && sourceLtTargetOppo))) ||
        (sourceDir[dirAccessor] !== 1 &&
          ((!isSameDir && sourceLtTargetOppo) ||
            (isSameDir && sourceGtTargetOppo)));

      if (flipSourceTarget) {
        return dirAccessor === "x" ? sourceTarget : targetSource;
      }
    }

    // this handles edges with same handle positions
    if (dirAccessor === "x") {
      return sourceDir.x === currDir ? targetSource : sourceTarget;
    } else {
      return sourceDir.y === currDir ? sourceTarget : targetSource;
    }
  }
};

export default getArrowDirection;
