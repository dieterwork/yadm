import { useEffect, type SVGAttributes } from "react";
import Diamond from "./Diamond";
import Circle from "./Circle";

type DiamondInCircleProps = {
  diamondAttributes?: SVGAttributes<SVGElement>;
  circleAttributes?: SVGAttributes<SVGElement>;
} & SVGAttributes<SVGElement>;

const DiamondInCircle = ({
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

  useEffect(() => {
    
  })

  return (
    <g {...restSvgAttributes}>
      <Circle width={width} height={height} {...circleAttributes} />
      <Diamond
        width={diamondWidth}
        height={diamondHeight}
        {...diamondAttributes}
      />
    </g>
  );
};

export default DiamondInCircle;
