import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import type { TransactorState } from "./transactor.types";
import Rectangle from "../../../shapes/Rectangle";
import { MEDIUM_NODE_SIZE } from "../../utils/consts";
import {
  getFocusFill,
  getTransactionDiamondStroke,
} from "$/shared/utils/utils";
import type { NodeFocus } from "../../nodes.types";

interface TransactionShapeProps {
  focus: NodeFocus;
  color?: string;
}

const TransactorShape = ({ focus, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getFocusFill(focus, color);

  return (
    <g>
      <Rectangle
        {...restSvgAttributes}
        transform={`translate(0, ${MEDIUM_NODE_SIZE / 2})`}
        fill={fill}
        width={width}
        height={+height - MEDIUM_NODE_SIZE / 2}
      />
      <DiamondInCircle
        {...restSvgAttributes}
        transform={`translate(${+width / 2 - MEDIUM_NODE_SIZE / 2}, 0)`}
        fill={fill}
        width={MEDIUM_NODE_SIZE}
        height={MEDIUM_NODE_SIZE}
        diamondAttributes={{
          stroke: getTransactionDiamondStroke(focus, color),
        }}
      />
    </g>
  );
};

export default TransactorShape;
