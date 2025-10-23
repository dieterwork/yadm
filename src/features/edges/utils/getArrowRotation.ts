import type { Position, XYPosition } from "@xyflow/react";
import { handleDirections } from "./smoothStep";

const getArrowRotation = ({
  source,
  target,
  offset,
  sourcePosition,
  targetPosition,
  interactiveEdgeDirection,
}: {
  source: XYPosition;
  target: XYPosition;
  interactiveEdgeDirection: "horizontal" | "vertical" | undefined;
  sourcePosition: Position;
  targetPosition: Position;
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
  const angle =
    Math.atan2(
      sourceGapped.y - targetGapped.y,
      sourceGapped.x - targetGapped.x
    ) + Math.PI;

  if (interactiveEdgeDirection) {
    const modulo = angle % Math.PI;
    if (interactiveEdgeDirection === "vertical") {
      if (modulo < Math.PI / 2) {
        return Math.floor(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo > Math.PI / 2) {
        return Math.ceil(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo === angle) {
        return angle;
      }
    } else {
      const roundedModulo = Math.floor(modulo * 1000) / 1000;
      const roundedPi = Math.floor(Math.PI * 1000) / 1000;
      if (roundedModulo === 0 || roundedPi === roundedModulo) {
        return angle;
      } else if (modulo < Math.PI && modulo > Math.PI / 2) {
        return Math.floor(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo > 0 && modulo < Math.PI / 2) {
        return Math.ceil(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      }
    }
  } else {
    // otherwise, round to nearest 90 deg
    const newAngle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
    return newAngle;
  }
};

export default getArrowRotation;
