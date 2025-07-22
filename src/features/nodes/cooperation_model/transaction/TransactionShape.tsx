import { useContext } from "react";
import Diamond from "../../../shapes/Diamond";
import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import type { Scope } from "../cooperation_model.types";
import { getScopeFill } from "../utils";
import type { TransactionState } from "./transaction.types";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Circle from "../../../shapes/Circle";
import TransactionShapePrimitive from "../../../shapes/DiamondInCircle";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils";

interface TransactionShapeProps {
  state: TransactionState;
  scope: Scope;
  color?: string;
}

const TransactionShape = ({ state, scope, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  const fill = getScopeFill(scope, color);

  switch (state) {
    case "missing":
      return (
        <g fill={fill} strokeDasharray="4 1" {...restSvgAttributes}>
          <DiamondInCircle
            width={width}
            height={height}
            fillOpacity={DEFAULT_FILL_OPACITY}
          />
        </g>
      );

    case "unclear":
      return (
        <g>
          <QuestionMark width={width} height={height} />
          <g fill={fill} {...restSvgAttributes}>
            <DiamondInCircle
              width={width}
              height={height}
              fillOpacity={DEFAULT_FILL_OPACITY}
            />
          </g>
        </g>
      );

    default: {
      return (
        <g fill={fill} {...restSvgAttributes}>
          <DiamondInCircle
            width={width}
            height={height}
            fillOpacity={DEFAULT_FILL_OPACITY}
          />
        </g>
      );
    }
  }
};

export default TransactionShape;
