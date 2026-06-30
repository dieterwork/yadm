import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";
import { getTransactionDiamondStroke } from "$/shared/utils/utils";

interface TransactionKindShapeProps {
  color?: string;
}

const TransactionKindShape = ({ color }: TransactionKindShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { height, ...restSvgAttributes } = svgAttributes;

  const stroke = getTransactionDiamondStroke(color);

  const fill =
    color !== "default"
      ? NODE_BACKGROUND_COLOR_MAP[color]
      : restSvgAttributes.fill;

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={height}
        height={height}
        fill={fill}
        stroke={stroke}
      />
    </>
  );
};

export default TransactionKindShape;
