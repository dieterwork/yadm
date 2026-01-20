import { EdgeLabelRenderer, Position } from "@xyflow/react";
import type { CSSProperties } from "react";

const getRotation = (direction: 1 | -1): CSSProperties["rotate"] => {
  if (direction === 1) {
    return "0";
  } else {
    return "180deg";
  }
};

const DoubleArrowMarker = ({
  labelX,
  labelY,
  rotation,
  direction = 1,
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
        className="absolute"
        style={{
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(${
            (rotation ?? 0) * (180 / Math.PI)
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
          points="1,1 6,6 1,11"
        ></polyline>
        <polyline
          className="double-arrow-marker"
          style={{
            stroke: "var(--color-slate-900)",
            fill: "transparent",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          points="6,1 11,6 6,11"
        ></polyline>
      </svg>
    </EdgeLabelRenderer>
  );
};

export default DoubleArrowMarker;
