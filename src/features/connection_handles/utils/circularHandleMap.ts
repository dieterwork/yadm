import { DEFAULT_STROKE_WIDTH } from "$/features/shapes/utils/consts";
import type { shapeMap } from "$/features/shapes/shapeMap";
import type { Rect } from "@xyflow/system";
import type { XYPosition } from "@xyflow/react";

const ELLIPSE_SEGMENTS = 128;

export type CircularHandleBuilder = (
  width: number,
  height: number,
) => XYPosition[][];

// shapes are drawn inside the node box, inset by the stroke width they are
// rendered with (see Shape), so a path that should sit on a shape's line has
// to be inset the same way
const getShapeBox = (width: number, height: number): Rect => ({
  x: DEFAULT_STROKE_WIDTH,
  y: DEFAULT_STROKE_WIDTH,
  width: width - 2 * DEFAULT_STROKE_WIDTH,
  height: height - 2 * DEFAULT_STROKE_WIDTH,
});

const ellipsePoints = (rect: Rect): XYPosition[] => {
  const rx = rect.width / 2;
  const ry = rect.height / 2;
  const centerX = rect.x + rx;
  const centerY = rect.y + ry;

  return Array.from({ length: ELLIPSE_SEGMENTS }, (_, index) => {
    const angle = (2 * Math.PI * index) / ELLIPSE_SEGMENTS;
    return {
      x: centerX + rx * Math.cos(angle),
      y: centerY + ry * Math.sin(angle),
    };
  });
};

const diamondPoints = (rect: Rect): XYPosition[] => [
  { x: rect.x, y: rect.y + rect.height / 2 },
  { x: rect.x + rect.width / 2, y: rect.y },
  { x: rect.x + rect.width, y: rect.y + rect.height / 2 },
  { x: rect.x + rect.width / 2, y: rect.y + rect.height },
];

const ellipsePath: CircularHandleBuilder = (width, height) => [
  ellipsePoints(getShapeBox(width, height)),
];

const diamondPath: CircularHandleBuilder = (width, height) => [
  diamondPoints(getShapeBox(width, height)),
];

const squareDiamondPath: CircularHandleBuilder = (_, height) =>
  diamondPath(height, height);

const doubleCirclePath: CircularHandleBuilder = (_, height) => {
  const front = getShapeBox(height, height);
  // the same shift DoubleDiamondInCircle draws the back circle with
  const shift = front.width / 8;

  return [
    ellipsePoints(front),
    ellipsePoints({ ...front, x: front.x + shift }),
  ];
};

const circularHandleMap = {
  // cooperation model
  transaction: ellipsePath,
  multiple_transaction_kind: doubleCirclePath,
  // transaction pattern diagram
  c_fact: ellipsePath,
  initiation_fact: ellipsePath,
  transaction_kind: squareDiamondPath,
  // object fact diagram
  production_event: diamondPath,
} satisfies Partial<Record<keyof typeof shapeMap, CircularHandleBuilder>>;

export type CircularHandleNodeType = keyof typeof circularHandleMap;

export const hasCircularHandles = (
  type?: string,
): type is CircularHandleNodeType => !!type && type in circularHandleMap;

// the box a shape's path spans within the node, the centre of which is what a
// handle is dragged around
export const getCircularHandleBounds = (
  type?: string,
  width?: number,
  height?: number,
): Rect | null => {
  if (!hasCircularHandles(type) || !width || !height) return null;

  const points = circularHandleMap[type](width, height).flat();
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);
  const [x, y] = [Math.min(...xValues), Math.min(...yValues)];

  return {
    x,
    y,
    width: Math.max(...xValues) - x,
    height: Math.max(...yValues) - y,
  };
};

export default circularHandleMap;
