import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeColor } from "../../../../shared/components/ui/colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";
import { NODE_BACKGROUND_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

type EntityClassShapeProps = {
  color?: NodeColor;
};

const EntityClassShape = ({ color }: EntityClassShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const fill =
    color !== "default" ? NODE_BACKGROUND_COLOR_MAP[color] : svgAttributes.fill;

  return (
    <>
      <g {...restSvgAttributes}>
        <Rectangle width={width} height={height} fill={fill} rx={30} ry={30} />
        <Rectangle
          x={width / 2 - (width - 20) / 2}
          y={height / 2 - (height - 20) / 2}
          width={width - 20}
          height={height - 20}
          fill={fill}
          rx={20}
          ry={20}
        />
      </g>
    </>
  );
};

export default EntityClassShape;
