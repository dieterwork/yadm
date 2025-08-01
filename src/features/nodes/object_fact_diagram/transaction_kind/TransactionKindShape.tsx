import QuestionMark from "../../../shapes/QuestionMark";
import Rectangle from "../../../shapes/Rectangle";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import Diamond from "../../../shapes/Diamond";

interface TransactionKindShapeProps {
  color?: string;
}

const TransactionKindShape = ({ color }: TransactionKindShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : restSvgAttributes.fill;

  return (
    <>
      <Diamond
        {...restSvgAttributes}
        width={height}
        height={height}
        fill={fill}
        stroke="var(--color-red-500)"
      />
    </>
  );
};

export default TransactionKindShape;
