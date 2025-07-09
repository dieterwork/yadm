import Actor from "./Actor";
import { type DEMOObjectComponentProps } from "./types";

export const DEMOObjectComponents = {
  actor: Actor,
};

const DEMOObject = ({
  type,
  width,
  height,
  ref,
  ...svgAttributes
}: DEMOObjectComponentProps) => {
  const DEMOObjectComponent = DEMOObjectComponents[type];

  if (!DEMOObjectComponent || !width || !height) return null;

  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  // we subtract the strokeWidth to make sure the shape is not cut off
  // this is done because svg doesn't support stroke inset (https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn)
  const innerWidth = width - 2 * strokeWidth;
  const innerHeight = height - 2 * strokeWidth;

  return (
    <svg
      width={width}
      height={height}
      className="demo-object-svg"
      data-demo-type={type}
      ref={ref}
    >
      {/* this offsets the shape by the strokeWidth so that we have enough space for the stroke */}
      <g
        transform={`translate(${svgAttributes.strokeWidth ?? 0}, ${
          svgAttributes.strokeWidth ?? 0
        })`}
      >
        <DEMOObjectComponent
          width={innerWidth}
          height={innerHeight}
          {...svgAttributes}
        />
      </g>
    </svg>
  );
};

export default DEMOObject;
