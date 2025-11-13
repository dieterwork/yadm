import type { ShapeProps } from "./shapes.types";

const Rectangle = ({
  width,
  height,
  transparent,
  ...svgAttributes
}: ShapeProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for rectangle");
  return (
    <g>
      <rect
        {...svgAttributes}
        width={width}
        height={height}
        fill={transparent ? "none" : "var(--color-white)"}
        fillOpacity={1}
      />
      <rect
        {...svgAttributes}
        width={width}
        height={height}
        fillOpacity={
          svgAttributes.fillOpacity ? svgAttributes.fillOpacity : 0.2
        }
      />
    </g>
  );
};

export default Rectangle;
