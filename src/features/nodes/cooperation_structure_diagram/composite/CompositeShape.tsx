import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";

import Rectangle from "../../../shapes/Rectangle";
import { getFocusFill } from "$/shared/utils/utils";
import type { NodeFocus } from "../../nodes.types";

interface CompositeShapeProps {
  focus: NodeFocus;
  color?: string;
}

const CompositeShape = ({ focus, color }: CompositeShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getFocusFill(focus, color);

  return (
    <Rectangle
      {...restSvgAttributes}
      fill={fill}
      width={width}
      height={height}
      strokeWidth={4}
    />
  );
};

export default CompositeShape;
