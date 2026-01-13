import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import DiamondInCircle from "../../../shapes/DiamondInCircle";
import Rectangle from "../../../shapes/Rectangle";
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
      <Rectangle fill={fill} width={width} height={height} />
      <DiamondInCircle
        transform={`translate(${+width / 2 - MEDIUM_NODE_SIZE / 2}, ${
          +height / 2 - MEDIUM_NODE_SIZE / 2
        })`}
        fill={fill}
        width={MEDIUM_NODE_SIZE}
        height={MEDIUM_NODE_SIZE}
        diamondAttributes={{ stroke: "var(--color-red-500)" }}
      />
    </g>
  );
};

export default SelfActivationShape;
