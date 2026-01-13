import {
  NODE_BORDER_COLOR_MAP,
  NODE_COLOR_MAP,
} from "$/shared/components/ui/colors/colors.consts";
import type { ShapeProps } from "./shapes.types";

const QuestionMark = ({ width, height, ...svgAttributes }: ShapeProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for question mark");
  return (
    <text
      x={width / 2}
      y={height / 2}
      fontSize={40}
      fill={NODE_BORDER_COLOR_MAP["default"]}
      textAnchor="middle"
      dominantBaseline="central"
      {...svgAttributes}
    >
      ?
    </text>
  );
};

export default QuestionMark;
