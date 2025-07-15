import { type DEMOObjectProps } from "../types";

const Actor = ({ width, height, ...svgAttributes }: DEMOObjectProps) => {
  return <rect x={0} y={0} width={width} height={height} {...svgAttributes} />;
};

export default Actor;
