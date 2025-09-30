import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";
import type { NodeColor } from "$components/ui/colors/colors.types";

type ProductionEventShapeProps = {
  width: number;
  height: number;
  color?: NodeColor;
};

const ProductionEventShape = ({ color }: ProductionEventShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color !== "default" ? color : svgAttributes?.fill;
  const fillOpacity = color !== "default" ? 0.2 : 1;

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </>
  );
};

export default ProductionEventShape;
