import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext.tsx";
import Circle from "../../../shapes/Circle.tsx";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts.ts";

interface ActorShapeProps {
  color?: string;
}

const CFactShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color
    ? NODE_BACKGROUND_COLOR_MAP[color]
    : restSvgAttributes.fill;

  return (
    <>
      <Circle
        {...restSvgAttributes}
        width={width}
        height={height}
        fill={fill}
      />
    </>
  );
};

export default CFactShape;
