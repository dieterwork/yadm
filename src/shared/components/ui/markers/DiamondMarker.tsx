import { NODE_COLOR_MAP } from "../colors/colors.consts";

const DiamondMarker = () => {
  return (
    <svg className="sr-only">
      <defs>
        <marker
          id="diamond"
          viewBox="-11 -11 20 20"
          markerHeight={20}
          markerWidth={20}
          markerUnits="strokeWidth"
          orient="auto-start-reverse"
          refX={0}
          refY={0}
        >
          <polyline
            style={{
              stroke: NODE_COLOR_MAP["red"],
              fill: NODE_COLOR_MAP["red"],
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
            points="-5,-4 -1,0 -5,4 -9,0 -5,-4"
          ></polyline>
        </marker>
      </defs>
    </svg>
  );
};

export default DiamondMarker;
