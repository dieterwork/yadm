import { handleDirections } from "$/features/edges/utils/smoothStep";
import { Position, type XYPosition } from "@xyflow/react";

const getHandleRotation = ({
  source,
  target,
  sourcePosition,
  targetPosition,
  linePath,
  derivation,
}: {
  source: XYPosition;
  target: XYPosition;
  sourcePosition: Position;
  targetPosition: Position;
  linePath?: string;
  derivation?: "aggregation" | "generalisation" | "none";
}) => {
  if (linePath !== "straight") return 0;
  const sourceDir = handleDirections[sourcePosition];
  const targetDir = handleDirections[targetPosition];
  const sourceGapped: XYPosition = {
    x: source.x + sourceDir.x,
    y: source.y + sourceDir.y,
  };
  const targetGapped: XYPosition = {
    x: target.x + targetDir.x,
    y: target.y + targetDir.y,
  };
  const angle = Math.atan2(
    sourceGapped.y - targetGapped.y,
    sourceGapped.x - targetGapped.x,
  );

  let derivationRotation = 0;

  if (derivation === "aggregation" || derivation === "generalisation") {
    switch (targetPosition) {
      case Position.Left: {
        derivationRotation = Math.PI;
        break;
      }
      case Position.Top: {
        derivationRotation = Math.PI / 2;
        break;
      }
      case Position.Right: {
        derivationRotation = 0;
        break;
      }
      case Position.Bottom: {
        derivationRotation = -Math.PI / 2;
        break;
      }
      default:
        derivationRotation = 0;
    }
  }
  return angle + derivationRotation;
};

export default getHandleRotation;
