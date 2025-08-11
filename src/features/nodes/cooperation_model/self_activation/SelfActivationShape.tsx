import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";
import type { SelfActivationState } from "./selfActivation.types";
import { MEDIUM_NODE_SIZE } from "../../utils/consts";

interface SelfActivationShapeProps {
  state: SelfActivationState;
  color?: string;
}

const SelfActivationShape = ({ state, color }: SelfActivationShapeProps) => {
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
      <g
        transform={`translate(${+width / 2 - MEDIUM_NODE_SIZE / 2}, ${
          +height / 2 - MEDIUM_NODE_SIZE / 2
        })`}
      >
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

export default SelfActivationShape;
