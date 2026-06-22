import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeColor } from "../../../../shared/components/ui/colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_BORDER_RADIUS } from "../objectFactDiagramConsts";
import { getScopeFill } from "../../../../shared/utils/utils";
import type { NodeScope } from "../../nodes.types";

type AttributeNodeShapeProps = {
  width: number;
  height: number;
  scope: NodeScope;
  color?: NodeColor;
};

const AttributeNodeShape = ({ scope, color }: AttributeNodeShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height } = svgAttributes;

  const fill = getScopeFill(scope, color);

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
