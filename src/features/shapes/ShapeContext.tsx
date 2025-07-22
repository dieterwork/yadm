import { createContext } from "react";
import type { ShapeProps } from "./shapes.types";

export type ShapeContextType = {
  innerWidth: number;
  innerHeight: number;
} & ShapeProps;

export const ShapeContext = createContext<ShapeProps | null>(null);
