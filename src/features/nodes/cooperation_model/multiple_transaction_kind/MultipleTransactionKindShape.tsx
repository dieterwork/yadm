import { useContext } from "react";
import QuestionMark from "../../../shapes/QuestionMark";
import { getScopeFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DoubleDiamondInCircle from "../../../shapes/DoubleDiamondInCircle";
import type {
  MultipleTransactionKindState,
  NodeScope,
} from "../../nodes.types";

interface MultipleTransactionKindShapeProps {
  state: MultipleTransactionKindState;
  scope: NodeScope;
  color?: string;
}

const MultipleTransactionKindShape = ({
  state,
  scope,
  color,
}: MultipleTransactionKindShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  const fill = getScopeFill(scope, color);

  switch (state) {
    case "missing":
      return (
        <DoubleDiamondInCircle
          {...restSvgAttributes}
          fill={fill}
          strokeDasharray={"6 4"}
          width={width}
          height={height}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      );

    case "unclear":
      return (
        <g>
          <DoubleDiamondInCircle
            {...restSvgAttributes}
            fill={fill}
            width={width}
            height={height}
            diamondAttributes={{ stroke: "var(--color-red-500)" }}
          />
          <QuestionMark {...restSvgAttributes} width={height} height={height} />
        </g>
      );

    default: {
      return (
        <DoubleDiamondInCircle
          {...restSvgAttributes}
          fill={fill}
          width={width}
          height={height}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      );
    }
  }
};

export default MultipleTransactionKindShape;
