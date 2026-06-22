import { Position } from "@xyflow/react";

const getDerivationRotation = (position: Position) => {
  switch (position) {
    case Position.Left:
      return 90;
    case Position.Top:
      return 180;
    case Position.Right:
      return -90;
    case Position.Bottom:
      return 0;
    default:
      return 0;
  }
};

export default getDerivationRotation;
