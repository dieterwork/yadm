import { getSmoothStepPath, Position, type XYPosition } from "@xyflow/react";
import type { ControlPoint } from "../edges.types";

interface UseEditableEdgeParams {
  controlPoints: ControlPoint[];
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
}

export const useEditableEdge = ({
  controlPoints,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: UseEditableEdgeParams) => {
  const edgeSegmentsCount = controlPoints.length + 1;
  const edgeSegmentsArray = [];

  // calculate the origin and destination of all the segments
  for (let i = 0; i < edgeSegmentsCount; i++) {
    let segmentSourceX, segmentSourceY, segmentTargetX, segmentTargetY;

    if (i === 0) {
      segmentSourceX = sourceX;
      segmentSourceY = sourceY;
    } else {
      const controlPoint = controlPoints[i - 1];
      segmentSourceX = controlPoint.x;
      segmentSourceY = controlPoint.y;
    }

    if (i === edgeSegmentsCount - 1) {
      segmentTargetX = targetX;
      segmentTargetY = targetY;
    } else {
      const controlPoint = controlPoints[i];
      segmentTargetX = controlPoint.x;
      segmentTargetY = controlPoint.y;
    }

    const [path, labelX, labelY] = getSmoothStepPath({
      sourceX: segmentSourceX,
      sourceY: segmentSourceY,
      sourcePosition,
      targetX: segmentTargetX,
      targetY: segmentTargetY,
      targetPosition,
    });

    edgeSegmentsArray.push({ path, labelX, labelY });
  }

  return edgeSegmentsArray;
};
