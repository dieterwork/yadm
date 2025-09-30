const DiamondMarker = () => {
  return (
    <svg className="sr-only">
      <defs>
        <marker
          id="diamond"
          viewBox="-10 -10 20 20"
          markerHeight={12.5}
          markerWidth={12.5}
          refX={0}
          refY={0}
        >
          <polyline
            style={{
              stroke: "var(--color-slate-900",
              fill: "var(--color-white",
              strokeWidth: 2,
            }}
            stroke-linecap="round"
            stroke-linejoin="round"
            points="-4,-4 0,0 -4,4 -8,0 -4,-4"
          ></polyline>
        </marker>
      </defs>
    </svg>
  );
};

export default DiamondMarker;
