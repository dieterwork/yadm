import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";

interface ActorShapeProps {
  color?: string;
}

const TransactionTimeShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  return (
    <>
      <line
        {...restSvgAttributes}
        y={height / 2}
        x1={0}
        x2={width}
        y1={height / 2}
        y2={height / 2}
        stroke={color ? color : "var(--color-slate-500)"}
      />
    </>
  );
};

export default TransactionTimeShape;
