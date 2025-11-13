import { type SVGAttributes } from "react";

export type ShapeProps = SVGAttributes<SVGElement> & {
  width: number;
  height: number;
  transparent?: boolean;
};
