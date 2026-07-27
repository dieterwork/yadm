import { useContext } from "react";
import QuestionMark from "../../../shapes/QuestionMark";
import {
  getFocusFill,
  getTransactionDiamondStroke,
} from "../../../../shared/utils/utils";
import type { TransactionState } from "./transaction.types";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import DoubleDiamondInCircle from "../../../shapes/DoubleDiamondInCircle";
import type { NodeFocus } from "../../nodes.types";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

interface TransactionShapeProps {
  state: TransactionState;
  focus: NodeFocus;
  color?: string;
}

const TransactionShape = ({ state, focus, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const circleFill =
    focus === "out"
      ? NODE_BACKGROUND_COLOR_MAP["gray"]
      : NODE_BACKGROUND_COLOR_MAP["default"];

  const diamondStroke = getTransactionDiamondStroke(color);
  const diamondFill = color
    ? NODE_BACKGROUND_COLOR_MAP[color]
    : NODE_BACKGROUND_COLOR_MAP["default"];

  switch (state) {
    case "missing":
      return (
        <DiamondInCircle
          {...restSvgAttributes}
          strokeDasharray={"6 4"}
          width={width}
          height={height}
          diamondAttributes={{
            stroke: diamondStroke,
            fill: diamondFill,
          }}
          circleAttributes={{
            fill: circleFill,
          }}
        />
      );

    case "unclear":
      return (
        <g>
          <DiamondInCircle
            {...restSvgAttributes}
            width={width}
            height={height}
            diamondAttributes={{
              stroke: diamondStroke,
              fill: diamondFill,
            }}
            circleAttributes={{
              fill: circleFill,
            }}
          />
          <QuestionMark {...restSvgAttributes} width={width} height={height} />
        </g>
      );

    case "double":
      return (
        <DoubleDiamondInCircle
          {...restSvgAttributes}
          width={width}
          height={height}
          diamondAttributes={{
            stroke: diamondStroke,
            fill: diamondFill,
          }}
          circleAttributes={{
            fill: circleFill,
          }}
        />
      );

    default: {
      return (
        <DiamondInCircle
          {...restSvgAttributes}
          width={width}
          height={height}
          diamondAttributes={{
            stroke: diamondStroke,
            fill: diamondFill,
          }}
          circleAttributes={{
            fill: circleFill,
          }}
        />
      );
    }
  }
};

export default TransactionShape;
