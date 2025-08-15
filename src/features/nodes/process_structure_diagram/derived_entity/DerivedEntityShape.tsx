import { useContext } from "react";
import { ShapeContext } from "../../../shapes/ShapeContext";
import type { ColorType } from "../../../colors/colors.types";
import Rectangle from "../../../shapes/Rectangle";
import { DEFAULT_BORDER_RADIUS } from "../productionStructureDiagramConsts";
import { getScopeFill } from "../../../../shared/utils/utils";
import type { Scope } from "../../cooperation_model/cooperationModel.types";

type DerivedEntityShapeProps = {
  width: number;
  height: number;
  scope: Scope;
  color?: ColorType;
};

const DerivedEntityShape = ({ scope, color }: DerivedEntityShapeProps) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) throw new Error("No shape context found");

  const { width, height, ...restSvgAttributes } = svgAttributes;

  const strokeWidth = svgAttributes?.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  const fill = getScopeFill(scope, color);

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

export default DerivedEntityShape;
