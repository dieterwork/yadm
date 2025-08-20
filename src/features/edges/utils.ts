import {
  Position,
  MarkerType,
  type XYPosition,
  type InternalNode,
} from "@xyflow/react";
import uuid from "../../shared/utils/uuid";
import type { ControlPointData } from "./ControlPoint";
import type { DEMONode } from "../nodes/nodes.types";

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(
  intersectionNode: InternalNode<DEMONode>,
  targetNode: InternalNode<DEMONode>
) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured;
  if (!intersectionNodeWidth || !intersectionNodeHeight)
    throw new Error("Could not find interesection node width or height");

  if (!targetNode.measured.width || !targetNode.measured.height)
    throw new Error("Could not find target node width or height");

  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.measured.width / 2;
  const y1 = targetPosition.y + targetNode.measured.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(
  node: InternalNode<DEMONode>,
  intersectionPoint: { x: number; y: number }
) {
  const n = { ...node.internals.positionAbsolute, ...node };
  if (!n.measured.width || !n.measured.height)
    throw new Error("could not find node width or height");
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.measured.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.measured.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(
  source: InternalNode<DEMONode>,
  target: InternalNode<DEMONode>
) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export const createEdge = ({
  type = "cooperation_model_edge",
  source,
  target,
}: {
  type: string;
  source: string;
  target: string;
}) => {
  return {
    id: uuid(),
    source,
    target,
    type,
    markerEnd: {
      type: MarkerType.Arrow,
    },
  };
};

export function getLinearPath(points: XYPosition[]) {
  if (points.length < 1) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }

  return path;
}

export function getLinearControlPoints(
  points: (ControlPointData | XYPosition)[]
) {
  const controlPoints = [] as ControlPointData[];

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (isControlPoint(p1)) {
      controlPoints.push(p1);
    }

    controlPoints.push({
      prev: "id" in p1 ? p1.id : undefined,
      id: uuid(),
      active: false,
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    });
  }

  return controlPoints;
}

export const isControlPoint = (
  point: ControlPointData | XYPosition
): point is ControlPointData => "id" in point;
