import type { ShapeProps } from "./shapes.types";

const Circle = ({ width, height, ...svgAttributes }: ShapeProps) => {
  if (!width || !height) throw new Error("No width/height provided for circle");
  return (
    <g>
      <ellipse
        {...svgAttributes}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        fill="white"
        fillOpacity={1}
      />
      <ellipse
        {...svgAttributes}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        fillOpacity={
          svgAttributes.fillOpacity ? svgAttributes.fillOpacity : 0.2
        }
      />
    </g>
  );
};

export default Circle;
