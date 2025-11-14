import { useContext } from "react";
import type { OrganizationState } from "../nodes.types";
import Rectangle from "$/features/shapes/Rectangle";
import { ShapeContext } from "$/features/shapes/ShapeContext";
import { ORGANIZATION_BORDER_COLOR_MAP } from "$/shared/components/ui/colors/colors.consts";

type Props = {
  state: OrganizationState;
  color: string;
};

const OrganizationShape = ({ state, color }: Props) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  const stroke = ORGANIZATION_BORDER_COLOR_MAP[color];
  return (
    <Rectangle
      {...restSvgAttributes}
      width={width}
      height={height}
      strokeDasharray={state === "missing" ? "6 4" : undefined}
      strokeWidth={4}
      stroke={stroke}
      transparent
    />
  );
};

export default OrganizationShape;
