import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { CompositeState } from "./composite.types";
import Rectangle from "../../../shapes/Rectangle";

interface CompositeShapeProps {
  state: CompositeState;
  color?: string;
}

const CompositeShape = ({ state, color }: CompositeShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;
  if (!width || !height) return;
  const fill = getStateFill(state, color);

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
