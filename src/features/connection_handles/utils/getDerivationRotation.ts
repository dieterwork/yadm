import { Position } from "@xyflow/react";

type Props = {
  position: Position;
};
const getDerivationRotation = ({ position }: Props) => {
  switch (position) {
    case Position.Left:
      return Math.PI / 2;
    case Position.Top:
      return Math.PI;
    case Position.Right:
      return -Math.PI / 2;
    case Position.Bottom:
      return 0;
    default:
      return 0;
  }
};

export default getDerivationRotation;
