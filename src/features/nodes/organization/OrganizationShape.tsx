import { useContext } from "react";
import type { OrganizationState } from "../nodes.types";
import Rectangle from "$/features/shapes/Rectangle";
import { ShapeContext } from "$/features/shapes/ShapeContext";

type Props = {
  state: OrganizationState;
};

const OrganizationShape = ({ state }: Props) => {
  const svgAttributes = useContext(ShapeContext);
  if (!svgAttributes) return null;
  const { width, height, ...restSvgAttributes } = svgAttributes;

  return (
    <Rectangle
      {...restSvgAttributes}
      width={width}
      height={height}
      strokeDasharray={state === "missing" ? "6 4" : undefined}
      strokeWidth={4}
    />
  );
};

export default OrganizationShape;
