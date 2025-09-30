import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeColor } from "../../../../shared/components/ui/colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";

type EntityClassShapeProps = {
  color?: NodeColor;
};

const EntityClassShape = ({ color }: EntityClassShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const strokeWidth = svgAttributes?.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  return (
    <>
      <g {...restSvgAttributes}>
        <Rectangle
          width={width}
          height={height}
          fill={color === "default" ? svgAttributes.fill : color}
          rx={30}
          ry={30}
        />
        <Rectangle
          x={width / 2 - (width - 20) / 2}
          y={height / 2 - (height - 20) / 2}
          width={width - 20}
          height={height - 20}
          fill={color === "default" ? svgAttributes.fill : color}
          rx={20}
          ry={20}
        />
      </g>
    </>
  );
};

export default EntityClassShape;
