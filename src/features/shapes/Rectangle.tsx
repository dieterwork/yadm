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
      />
      <rect {...svgAttributes} width={width} height={height} />
    </g>
  );
};

export default Rectangle;
