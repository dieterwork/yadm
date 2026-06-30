type Props = {
  size?: number;
  rotation?: number;
};

const AggregationHandle = ({ size = 32, rotation = 0 }: Props) => {
  return (
    <svg
      className="aggregation-handle"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation * (180 / Math.PI)}deg)` }}
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
        strokeWidth="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
export default AggregationHandle;
