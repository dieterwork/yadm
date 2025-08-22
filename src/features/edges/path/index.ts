import { type XYPosition } from "@xyflow/react";
import type { ControlPointData } from "../ControlPoint";

import { getSmoothStepPath } from "../edges.utils";
import { getSmoothStepControlPoints } from "./smoothStep";

export function getControlPoints(points: (ControlPointData | XYPosition)[]) {
  return getSmoothStepControlPoints(points);
}

export function getPath(points: XYPosition[]) {
  return getSmoothStepPath(points);
}
