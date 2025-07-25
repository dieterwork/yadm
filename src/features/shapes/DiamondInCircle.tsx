import { type SVGAttributes } from "react";
import Diamond from "./Diamond";
import Circle from "./Circle";

type DiamondInCircleProps = {
  x?: number;
  y?: number;
  diamondAttributes?: SVGAttributes<SVGElement>;
  circleAttributes?: SVGAttributes<SVGElement>;
} & SVGAttributes<SVGElement>;

const DiamondInCircle = ({
  x,
  y,
  diamondAttributes,
  circleAttributes,
  ...restSvgAttributes
}: DiamondInCircleProps) => {
  const { width, height } = restSvgAttributes;
  if (!width || !height) return;
  const strokeWidth = restSvgAttributes.strokeWidth
    ? +restSvgAttributes.strokeWidth
    : 0;

  const diamondWidth = +width - strokeWidth * 2;
  const diamondHeight = +height - strokeWidth * 2;

  return (
    <g x={x} y={x} {...restSvgAttributes}>
      <g>
        <Circle
          {...circleAttributes}
          width={width}
          height={height}
          fill="white"
          fillOpacity={1}
        />
        <Circle width={width} height={height} {...circleAttributes} />
      </g>
      <g>
        <Diamond
          {...diamondAttributes}
          width={diamondWidth}
          height={diamondHeight}
          fill="white"
          fillOpacity={1}
        />
        <Diamond
          {...diamondAttributes}
          width={diamondWidth}
          height={diamondHeight}
        />
      </g>
    </g>
  );
};

export default DiamondInCircle;
