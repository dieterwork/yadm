import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeColor } from "../../../../shared/components/ui/colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";
import { getFocusFill } from "../../../../shared/utils/utils";
import type { NodeFocus } from "../../nodes.types";

type AttributeNodeShapeProps = {
  width: number;
  height: number;
  focus: NodeFocus;
  color?: NodeColor;
};

const AttributeNodeShape = ({ focus, color }: AttributeNodeShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height } = svgAttributes;

  const fill = getFocusFill(focus, color);

  return (
    <>
      <Rectangle
        {...svgAttributes}
        width={width}
        height={height}
        fill={fill}
        rx={8}
        ry={8}
      />
    </>
  );
};

export default AttributeNodeShape;
