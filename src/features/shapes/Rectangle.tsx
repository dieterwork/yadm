import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";
import type { ShapeProps } from "./shapes.types";

const Rectangle = ({
  width,
  height,
  transparent,
  fill,
  ...svgAttributes
}: ShapeProps) => {
  if (!width || !height)
    throw new Error("No width/height provided for rectangle");
  return (
    <g>
      <rect
        {...svgAttributes}
        width={width}
        height={height}
        fill={transparent ? "none" : NODE_BACKGROUND_COLOR_MAP["default"]}
      />
      <rect
        {...svgAttributes}
        width={width}
        height={height}
        fill={transparent ? "none" : fill}
      />
    </g>
  );
};

export default Rectangle;
