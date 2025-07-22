import type { RefObject } from "react";
import { type ShapeProps } from "./shapes.types";
import { ShapeContext } from "./ShapeContext";
import type React from "react";

interface ShapeWrapperProps extends Partial<ShapeProps> {
  ref?: RefObject<SVGSVGElement>;
  children: React.ReactElement<ShapeProps>;
}
const Shape = ({
  ref,
  width,
  height,
  children,
  ...svgAttributes
}: ShapeWrapperProps) => {
  if (!width || !height) return null;

  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  // we subtract the strokeWidth to make sure the shape is not cut off
  // this is done because svg doesn't support stroke inset (https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn)
  const innerWidth = width - 2 * strokeWidth;
  const innerHeight = height - 2 * strokeWidth;

  return (
    <ShapeContext
      value={{ width: innerWidth, height: innerHeight, ...svgAttributes }}
    >
      <svg width={width} height={height} className="demo-shape-svg" ref={ref}>
        {/* this offsets the shape by the strokeWidth so that we have enough space for the stroke */}
        <g
          transform={`translate(${svgAttributes.strokeWidth ?? 0}, ${
            svgAttributes.strokeWidth ?? 0
          })`}
        >
          {children}
        </g>
      </svg>
    </ShapeContext>
  );
};

export default Shape;
