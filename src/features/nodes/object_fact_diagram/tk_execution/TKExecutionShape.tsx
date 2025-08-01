import Rectangle from "../../../shapes/Rectangle.tsx";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext.tsx";

interface ActorShapeProps {
  color?: string;
}

const TKExecutionShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill = color ? color : "var(--color-slate-500)";

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

export default TKExecutionShape;
