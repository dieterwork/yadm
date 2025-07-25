import { useContext } from "react";
import { getStateFill } from "../utils";
import { ShapeContext } from "../../../shapes/ShapeContext";
import { DEFAULT_FILL_OPACITY } from "../../../shapes/utils";
import type { CompositeCTARState } from "./compositeCTAR.types";
import Rectangle from "../../../shapes/Rectangle";

interface CompositeCTARShapeProps {
  state: CompositeCTARState;
  color?: string;
}

const CompositeCTARShape = ({ state, color }: CompositeCTARShapeProps) => {
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

export default CompositeCTARShape;
