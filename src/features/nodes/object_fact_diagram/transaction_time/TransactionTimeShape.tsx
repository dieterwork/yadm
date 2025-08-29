import Rectangle from "../../../shapes/Rectangle";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";

interface ActorShapeProps {
  color?: string;
}

const TransactionTimeShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : restSvgAttributes.fill;

  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  return (
    <>
      <Rectangle
        rx={height / 2}
        ry={height / 2}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.2}
        {...restSvgAttributes}
      />
    </>
  );
};

export default TransactionTimeShape;
