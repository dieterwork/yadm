import Rectangle from "../../../shapes/Rectangle";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

interface ActorShapeProps {
  color?: string;
}

const TransactionTimeShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color
    ? NODE_BACKGROUND_COLOR_MAP[color]
    : restSvgAttributes.fill;

  return (
    <>
      <Rectangle
        rx={height / 2}
        ry={height / 2}
        width={width}
        height={height}
        fill={fill}
        {...restSvgAttributes}
      />
    </>
  );
};

export default TransactionTimeShape;
