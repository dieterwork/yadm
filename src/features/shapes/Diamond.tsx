import type { SVGAttributes } from "react";
import { generatePath } from "./utils";
import type { ShapeProps } from "./shapes.types";

const Diamond = ({ width, height, ...svgAttributes }: ShapeProps) => {
  const diamondPath = generatePath([
    [0, height / 2],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
  ]);

  return <path d={diamondPath} {...svgAttributes} />;
};

export default Diamond;
