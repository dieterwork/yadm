import { Position } from "@xyflow/react";
import getDerivationRotation from "./utils/getDerivationRotation";

type Props = {
  position: Position;
  size?: number;
};

const AggregationHandle = ({ position, size = 32 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${getDerivationRotation(position)}deg)` }}
    >
      <polygon
        points="16,3 29,27 3,27"
        fill="white"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 14 L16 22 M12.5 16 L19.5 20 M19.5 16 L12.5 20"
        stroke="var(--color-black)"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
export default AggregationHandle;
