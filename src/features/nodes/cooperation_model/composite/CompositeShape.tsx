import { useContext } from "react";
import { getStateFill } from "../../../../shared/utils/utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { CompositeState } from "./compositetypes";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils/consts";

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
    </g>
  );
};

export default CompositeShape;
