import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { NodeColor } from "../../../../shared/components/ui/colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_BORDER_RADIUS } from "../objectFactDiagramConsts";
import { getFocusFill } from "../../../../shared/utils/utils";
import type { NodeFocus } from "../../nodes.types";

type EntityTypeShapeProps = {
  width: number;
  height: number;
  focus: NodeFocus;
  color?: NodeColor;
};

const EntityTypeShape = ({ focus, color }: EntityTypeShapeProps) => {
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
        rx={DEFAULT_BORDER_RADIUS}
        ry={DEFAULT_BORDER_RADIUS}
      />
    </>
  );
};

export default EntityTypeShape;
