import { useContext } from "react";
import QuestionMark from "../../../shapes/QuestionMark";
import { getScopeFill } from "../../../../shared/utils/utils";
import type { TransactionState } from "./transaction.types";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import DoubleDiamondInCircle from "../../../shapes/DoubleDiamondInCircle";
import type { NodeScope } from "../../nodes.types";

interface TransactionShapeProps {
  state: TransactionState;
  scope: NodeScope;
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
        <DiamondInCircle
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
          <DiamondInCircle
            {...restSvgAttributes}
            fill={fill}
            width={width}
            height={height}
            diamondAttributes={{ stroke: "var(--color-red-500)" }}
          />
          <QuestionMark {...restSvgAttributes} width={width} height={height} />
        </g>
      );

    case "double":
      return (
        <DoubleDiamondInCircle
          {...restSvgAttributes}
          fill={fill}
          width={width}
          height={height}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      );

    default: {
      return (
        <DiamondInCircle
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

export default TransactionShape;
