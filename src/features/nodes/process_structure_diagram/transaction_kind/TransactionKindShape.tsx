import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";
import {
  NODE_BACKGROUND_COLOR_MAP,
  NODE_BORDER_COLOR_MAP,
} from "$/shared/components/ui/colors/colors.consts";

interface TransactionKindShapeProps {
  color?: string;
}

const TransactionKindShape = ({ color }: TransactionKindShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { height, ...restSvgAttributes } = svgAttributes;

  const fill = color
    ? NODE_BACKGROUND_COLOR_MAP[color]
    : restSvgAttributes.fill;

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={height}
        height={height}
        fill={fill}
        stroke={NODE_BORDER_COLOR_MAP["red"]}
      />
    </>
  );
};

export default TransactionKindShape;
