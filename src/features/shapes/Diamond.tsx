import type { ShapeProps } from "./shapes.types";
import { generatePath } from "./utils/generatePath";

const Diamond = ({ width, height, ...svgAttributes }: ShapeProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for diamond");
  const diamondPath = generatePath([
    [0, height / 2],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
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
