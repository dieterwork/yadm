import { type DEMOObjectProps } from "../types";
import { generatePath } from "../utils";

const Transaction = ({ width, height, ...svgAttributes }: DEMOObjectProps) => {
  const diamondPath = generatePath([
    [0, height / 2],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
  ]);

  return (
    <g>
      <path d={diamondPath} {...svgAttributes} />
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        {...svgAttributes}
      />
    </g>
  );
};

export default Transaction;
