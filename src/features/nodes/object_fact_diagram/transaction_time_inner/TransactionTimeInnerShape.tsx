import Rectangle from "../../../shapes/Rectangle";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import { X_SMALL_NODE_SIZE } from "../../utils/consts";

interface ActorShapeProps {
  color?: string;
}

const TransactionTimeInnerShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : restSvgAttributes.fill;

  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  const rectWidth = width - X_SMALL_NODE_SIZE + 2 * strokeWidth;
  const rectHeight = height - X_SMALL_NODE_SIZE + 2 * strokeWidth;

  return (
    <>
      <Rectangle
        x={width / 2 - rectWidth / 2}
        y={height / 2 - rectHeight / 2}
        rx={rectHeight / 2}
        ry={rectHeight / 2}
        width={rectWidth}
        height={rectHeight}
        fill={fill}
        fillOpacity={0.2}
        {...restSvgAttributes}
      />
    </>
  );
};

export default TransactionTimeInnerShape;
