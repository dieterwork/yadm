import { useContext } from "react";
import QuestionMark from "../../../shapes/QuestionMark";
import {
  getFocusFill,
  getTransactionDiamondStroke,
} from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DoubleDiamondInCircle from "../../../shapes/DoubleDiamondInCircle";
import type {
  MultipleTransactionKindState,
  NodeFocus,
} from "../../nodes.types";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

interface MultipleTransactionKindShapeProps {
  state: MultipleTransactionKindState;
  focus: NodeFocus;
  color?: string;
}

const MultipleTransactionKindShape = ({
  state,
  focus,
  color,
}: MultipleTransactionKindShapeProps) => {
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
        <DoubleDiamondInCircle
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
          <QuestionMark {...restSvgAttributes} width={height} height={height} />
        </g>
      );

    default: {
      return (
        <DoubleDiamondInCircle
          {...restSvgAttributes}
          // fill={fill}
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

export default MultipleTransactionKindShape;
