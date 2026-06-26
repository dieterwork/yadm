import { type SVGAttributes } from "react";
import Circle from "./Circle";
import DiamondInCircle from "./DiamondInCircle";
import type { ShapeProps } from "./shapes.types";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

type DiamondInCircleProps = ShapeProps & {
  diamondAttributes?: SVGAttributes<SVGElement>;
  circleAttributes?: SVGAttributes<SVGElement>;
};

const DoubleDiamondInCircle = ({
  width,
  height,
  diamondAttributes,
  circleAttributes,
  ...restSvgAttributes
}: DiamondInCircleProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for double diamond in circle");

  return (
    <g {...restSvgAttributes}>
      <Circle
        {...circleAttributes}
        width={height}
        height={height}
        transform={`translate(${height / 8}, 0)`}
      />
      <DiamondInCircle
        width={height}
        height={height}
        diamondAttributes={diamondAttributes}
        circleAttributes={circleAttributes}
      />
    </g>
  );
};

export default DoubleDiamondInCircle;
