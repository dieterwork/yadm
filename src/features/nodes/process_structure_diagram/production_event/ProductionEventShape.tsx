import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";
import type { ColorType } from "../../../colors/colors.types";

type ProductionEventShapeProps = {
  width: number;
  height: number;
  color?: ColorType;
};

const ProductionEventShape = ({ color }: ProductionEventShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : svgAttributes?.fill;

  console.log(svgAttributes);

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={1}
      />
    </>
  );
};

export default ProductionEventShape;
