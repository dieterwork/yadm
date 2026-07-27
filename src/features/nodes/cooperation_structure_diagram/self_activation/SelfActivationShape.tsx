import { useContext } from "react";
import { getFocusFill, getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Rectangle from "../../../shapes/Rectangle";
import type { SelfActivationState } from "./selfActivation.types";
import type { NodeFocus } from "../../nodes.types";

interface SelfActivationShapeProps {
  focus: NodeFocus;
  color?: string;
}

const SelfActivationShape = ({ focus, color }: SelfActivationShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getFocusFill(focus, color);

  return (
    <g {...restSvgAttributes}>
      <Rectangle fill={fill} width={width} height={height} />
    </g>
  );
};

export default SelfActivationShape;
