import { type SVGAttributes } from "react";
import Diamond from "./Diamond";
import Circle from "./Circle";
import DiamondInCircle from "./DiamondInCircle";

type DiamondInCircleProps = {
  diamondAttributes?: SVGAttributes<SVGElement>;
  circleAttributes?: SVGAttributes<SVGElement>;
} & SVGAttributes<SVGElement>;

const OFFSET = 1 / 8;

const DoubleDiamondInCircle = ({
  diamondAttributes,
  circleAttributes,
  ...restSvgAttributes
}: DiamondInCircleProps) => {
  const { width, height } = restSvgAttributes;
  if (!width) throw new Error("Width not defined");
  if (!height) throw new Error("Height not defined");

  // get circleWidth and offsetWidth
  const circleWidth = +width / 2 - OFFSET;
  const circleOffsetWidth = circleWidth * OFFSET;

  return (
    <g {...restSvgAttributes}>
      <g transform={`translate(${circleOffsetWidth}, 0)`}>
        <DiamondInCircle
          width={circleWidth}
          height={circleWidth}
          diamondAttributes={diamondAttributes}
          circleAttributes={circleAttributes}
          fill="white"
          fillOpacity={1}
        />
        <DiamondInCircle
          width={circleWidth}
          height={circleWidth}
          diamondAttributes={diamondAttributes}
          circleAttributes={circleAttributes}
        />
      </g>
      <g>
        <DiamondInCircle
          width={circleWidth}
          height={circleWidth}
          diamondAttributes={diamondAttributes}
          circleAttributes={circleAttributes}
          fill="white"
          fillOpacity={1}
        />
        <DiamondInCircle
          width={circleWidth}
          height={circleWidth}
          diamondAttributes={diamondAttributes}
          circleAttributes={circleAttributes}
        />
      </g>
    </g>
  );
};

export default DoubleDiamondInCircle;
