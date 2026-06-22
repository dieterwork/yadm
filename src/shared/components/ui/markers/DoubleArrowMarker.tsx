import { EdgeLabelRenderer } from "@xyflow/react";

const DoubleArrowMarker = ({
  labelX,
  labelY,
  rotation,
}: {
  labelX: number;
  labelY: number;
  rotation?: number;
  direction?: 1 | -1;
}) => {
  return (
    <EdgeLabelRenderer>
      <svg
        width={12.5}
        height={12.5}
        viewBox="0 0 12.5 12.5"
        className="double-arrow-marker absolute"
        style={{
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(${
            (Math.round((rotation ?? 0) * 1000) / 1000) * (180 / Math.PI)
          }deg)`,
        }}
      >
        <polyline
          className="double-arrow-marker"
          style={{
            stroke: "var(--color-slate-900)",
            fill: "transparent",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          points="3.25,1 9.25,6.25 3.25,11.5"
        ></polyline>
      </svg>
    </EdgeLabelRenderer>
  );
};

export default DoubleArrowMarker;
