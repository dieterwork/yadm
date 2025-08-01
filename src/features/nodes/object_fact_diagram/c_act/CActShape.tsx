import Rectangle from "../../../shapes/Rectangle.tsx";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext.tsx";

interface ActorShapeProps {
  color?: string;
}

const CActShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : restSvgAttributes.fill;

  return (
    <>
      <Rectangle
        {...restSvgAttributes}
        width={width}
        height={height}
        fill={fill}
      />
    </>
  );
};

export default CActShape;
