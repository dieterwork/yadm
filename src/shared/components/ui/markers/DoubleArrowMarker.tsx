import { EdgeLabelRenderer, Position } from "@xyflow/react";
import type { CSSProperties } from "react";

const getRotation = (direction: Position): CSSProperties["rotate"] => {
  switch (direction) {
    case Position.Left: {
      return "180deg";
    }
    case Position.Right: {
      return "0deg";
    }
    case Position.Bottom: {
      return "90deg";
    }
    case Position.Top: {
      return "270deg";
    }
    default: {
      return "0deg";
    }
  }
};

const DoubleArrowMarker = ({
  labelX,
  labelY,
  direction = Position.Right,
}: {
  labelX: number;
  labelY: number;
  direction?: Position;
}) => {
  return (
    <EdgeLabelRenderer>
      <svg
        width={12.5}
        height={12.5}
        viewBox="0 0 12.5 12.5"
        className="absolute"
        style={{
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(${getRotation(
            direction
          )})`,
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
