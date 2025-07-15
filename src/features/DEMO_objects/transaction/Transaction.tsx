import type { DEMOObjectProps } from "../types";
import { generatePath } from "../utils";

const Transaction = ({ width, height, ...svgAttributes }: DEMOObjectProps) => {
  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;
  const diamondPath = generatePath([
    [strokeWidth, height / 2],
    [width / 2, strokeWidth],
    [width - strokeWidth, height / 2],
    [width / 2, height - strokeWidth],
  ]);

  return (
    <g>
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        {...svgAttributes}
      />
      <path d={diamondPath} {...svgAttributes} />
    </g>
  );
};

export default Transaction;
