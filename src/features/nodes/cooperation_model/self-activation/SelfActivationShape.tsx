import { useContext } from "react";
import { getStateFill } from "../utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils";
import type { TransactorState } from "./selfActivation.types";
import Rectangle from "../../../shapes/Rectangle";

interface TransactionShapeProps {
  state: TransactorState;
  color?: string;
}

const SelfActivationShape = ({ state, color }: TransactionShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getStateFill(state, color);

  return (
    <g {...restSvgAttributes}>
      <g>
        <Rectangle width={width} height={height} fill="white" />
        <Rectangle
          fill={fill}
          width={width}
          height={height}
          fillOpacity={DEFAULT_FILL_OPACITY}
        />
      </g>
      <g transform={`translate(${+width / 4}, ${+height / 4})`}>
        <DiamondInCircle
          fill={fill}
          width={+width / 2}
          height={+width / 2}
          fillOpacity={DEFAULT_FILL_OPACITY}
        />
      </g>
    </g>
  );
};

export default SelfActivationShape;
