import type { ShapeProps } from "./shapes.types";

const Rectangle = ({ width, height, ...svgAttributes }: ShapeProps) => {
  return <rect x={0} y={0} width={width} height={height} {...svgAttributes} />;
};

export default Rectangle;
