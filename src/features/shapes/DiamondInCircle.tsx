import { type SVGAttributes } from "react";
import Diamond from "./Diamond";
import Circle from "./Circle";
import type { ShapeProps } from "./shapes.types";

type DiamondInCircleProps = ShapeProps & {
  diamondAttributes?: SVGAttributes<SVGElement>;
  circleAttributes?: SVGAttributes<SVGElement>;
};

const DiamondInCircle = ({
  width,
  height,
  diamondAttributes,
  circleAttributes,
  ...restSvgAttributes
}: DiamondInCircleProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for diamond in circle");

  const diamondWidth = width - 2 * 2;
  const diamondHeight = height - 2 * 2;

  return (
    <g {...restSvgAttributes}>
      <Circle {...circleAttributes} width={width} height={height} />
      <Diamond
        {...diamondAttributes}
        width={diamondWidth}
        height={diamondHeight}
        offset={2}
      />
    </g>
  );
};

export default DiamondInCircle;
