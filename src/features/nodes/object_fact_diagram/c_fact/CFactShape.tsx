import QuestionMark from "../../../shapes/QuestionMark.tsx";
import Rectangle from "../../../shapes/Rectangle.tsx";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext.tsx";
import Circle from "../../../shapes/Circle.tsx";

interface ActorShapeProps {
  color?: string;
}

const CFactShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : restSvgAttributes.fill;

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
