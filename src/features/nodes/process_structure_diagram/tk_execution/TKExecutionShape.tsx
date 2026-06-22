import Rectangle from "../../../shapes/Rectangle.tsx";
import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext.tsx";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts.ts";

interface ActorShapeProps {
  color?: string;
}

const TKExecutionShape = ({ color }: ActorShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill =
    color !== "default"
      ? NODE_BACKGROUND_COLOR_MAP[color]
      : NODE_BACKGROUND_COLOR_MAP["gray"];

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
