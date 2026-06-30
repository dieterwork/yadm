import { handleDirections } from "$/features/edges/utils/smoothStep";
import { Position, type XYPosition } from "@xyflow/react";

const getDerivationRotation = ({
  source,
  target,
  sourcePosition,
  targetPosition,
  linePath,
}: {
  source: XYPosition;
  target: XYPosition;
  sourcePosition: Position;
  targetPosition: Position;
  linePath?: string;
}) => {
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
  // const angle =
  //   linePath === "straight"
  //     ? Math.atan2(
  //         sourceGapped.y - targetGapped.y,
  //         sourceGapped.x - targetGapped.x,
  //       )
  //     : 0;
  //
  const angle = 0;

  switch (targetPosition) {
    case Position.Left:
      return Math.PI / 2 + angle;
    case Position.Top:
      return Math.PI + angle;
    case Position.Right:
      return -Math.PI / 2 + angle;
    case Position.Bottom:
      return -Math.PI + angle;
    default:
      return 0;
  }
};

export default getDerivationRotation;
