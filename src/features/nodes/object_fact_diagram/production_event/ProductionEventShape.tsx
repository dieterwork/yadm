import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";
import type { NodeColor } from "$components/ui/colors/colors.types";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

type ProductionEventShapeProps = {
  width: number;
  height: number;
  color?: NodeColor;
};

const ProductionEventShape = ({ color }: ProductionEventShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill =
    color !== "default"
      ? NODE_BACKGROUND_COLOR_MAP[color]
      : svgAttributes?.fill;

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={width}
        height={height}
        fill={fill}
      />
    </>
  );
};

export default ProductionEventShape;
