import type { ShapeProps } from "./shapes.types";
import { generatePath } from "./utils/generatePath";

const Diamond = ({
  width,
  height,
  path,
  x,
  y,
  offset = 0,
  ...svgAttributes
}: ShapeProps & { offset?: number }) => {
  if (!width || !height)
    throw new Error("No width/height provided for diamond");
  const diamondPath = generatePath([
    [0 + offset, height / 2 + offset],
    [width / 2 + offset, 0 + offset],
    [width + offset, height / 2 + offset],
    [width / 2 + offset, height + offset],
  ]);

  return (
    <g>
      <path {...svgAttributes} d={diamondPath} fill="white" fillOpacity={1} />
      <path
        {...svgAttributes}
        d={diamondPath}
        fillOpacity={
          svgAttributes.fillOpacity ? svgAttributes.fillOpacity : 0.2
        }
      />
    </g>
  );
};

export default Diamond;
