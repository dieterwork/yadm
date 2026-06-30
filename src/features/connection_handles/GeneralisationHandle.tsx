type Props = {
  size?: number;
  rotation?: number;
};

const GeneralisationHandle = ({ size = 32, rotation = 0 }: Props) => {
  return (
    <svg
      className="generalisation-handle pointer-events-none"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation * (180 / Math.PI)}deg)` }}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="16,3 29,27 3,27"
        fill="white"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 14 L16 22 M12 18 L20 18"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default GeneralisationHandle;
