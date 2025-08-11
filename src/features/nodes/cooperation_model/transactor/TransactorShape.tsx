import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import type { TransactorState } from "./transactor.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";
import { MEDIUM_NODE_SIZE } from "../../utils/consts";

interface TransactionShapeProps {
  state: TransactorState;
  color?: string;
}

const TransactorShape = ({ state, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getStateFill(state, color);

  return (
    <g {...restSvgAttributes}>
      <g transform={`translate(0, ${MEDIUM_NODE_SIZE / 2})`}>
        <Rectangle
          width={width}
          height={+height - MEDIUM_NODE_SIZE / 2}
          fill="white"
        />
        <Rectangle
          fill={fill}
          width={width}
          height={+height - MEDIUM_NODE_SIZE / 2}
          fillOpacity={DEFAULT_FILL_OPACITY}
        />
      </g>
      <g transform={`translate(${+width / 2 - MEDIUM_NODE_SIZE / 2}, 0)`}>
        <DiamondInCircle
          fill={fill}
          width={MEDIUM_NODE_SIZE}
          height={MEDIUM_NODE_SIZE}
          fillOpacity={DEFAULT_FILL_OPACITY}
          diamondAttributes={{ stroke: "var(--color-red-500)" }}
        />
      </g>
    </g>
  );
};

export default TransactorShape;
