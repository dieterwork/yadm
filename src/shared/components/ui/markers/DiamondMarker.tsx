const DiamondMarker = () => {
  return (
    <svg className="sr-only">
      <defs>
        <marker
          id="diamond"
          viewBox="-10 -10 20 20"
          markerHeight={12.5}
          markerWidth={12.5}
          markerUnits="strokeWidth"
          orient="auto-start-reverse"
          refX={0}
          refY={0}
        >
          <polyline
            style={{
              stroke: "var(--color-rose-500)",
              fill: "var(--color-rose-500)",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            points="-4,-4 0,0 -4,4 -8,0 -4,-4"
          ></polyline>
        </marker>
      </defs>
    </svg>
  );
};

export default DiamondMarker;
