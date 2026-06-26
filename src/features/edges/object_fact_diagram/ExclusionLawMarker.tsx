import { EdgeLabelRenderer } from "@xyflow/react";

type Props = {
  labelX: number;
  labelY: number;
};
const ExclusionLawMarker = ({ labelX, labelY }: Props) => {
  return (
    <EdgeLabelRenderer>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="exclusion-law-marker | absolute z-300"
        style={{
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="var(--color-white)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="8" y1="8" x2="16" y2="16" />
          <line x1="16" y1="8" x2="8" y2="16" />
        </g>
      </svg>
    </EdgeLabelRenderer>
  );
};

export default ExclusionLawMarker;
