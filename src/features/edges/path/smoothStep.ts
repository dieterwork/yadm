import type { ControlPointData } from "../ControlPoint";
import { Position, type XYPosition } from "@xyflow/react";

import { isControlPoint } from "./utils";
import { getDirection, getPoints } from "../edges.utils";
import uuid from "../../../shared/utils/uuid";

const handleDirections = {
  [Position.Left]: { x: -1, y: 0 },
  [Position.Right]: { x: 1, y: 0 },
  [Position.Top]: { x: 0, y: -1 },
  [Position.Bottom]: { x: 0, y: 1 },
};

export function getSmoothStepControlPoints({
  points,
  source,
  target,
  sourcePosition,
  targetPosition,
}: {
  points: (ControlPointData | XYPosition)[];
  source: XYPosition;
  target: XYPosition;
  sourcePosition: Position;
  targetPosition: Position;
}) {
  const controlPoints = [] as ControlPointData[];

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (isControlPoint(p1)) {
      controlPoints.push(p1);
    }

    let [smoothStepPoints] = getPoints({
      source: { x: p1.x, y: p1.y },
      sourcePosition,
      target: { x: p2.x, y: p2.y },
      targetPosition,
      center: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
    });

    smoothStepPoints = smoothStepPoints.filter(
      (_, i) => i !== 0 && i !== smoothStepPoints.length - 1
    );

    for (let j = 0; j < smoothStepPoints.length - 1; j++) {
      controlPoints.push({
        prev: "id" in p1 ? p1.id : undefined,
        id: uuid(),
        active: false,
        x: smoothStepPoints[j].x,
        y: smoothStepPoints[j].y,
      });
    }
  }

  return controlPoints;
}
