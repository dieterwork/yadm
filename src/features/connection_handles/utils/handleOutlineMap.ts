import { DEFAULT_STROKE_WIDTH } from "$/features/shapes/utils/consts";
import type { shapeMap } from "$/features/shapes/shapeMap";
import type { Rect } from "@xyflow/system";
import type { XYPosition } from "@xyflow/react";

const ELLIPSE_SEGMENTS = 128;

export type HandleOutlineBuilder = (
  width: number,
  height: number,
) => XYPosition[][];

const getOutlineBox = (width: number, height: number): Rect => ({
  x: 0,
  y: 0,
  width,
  height,
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

const ellipseOutline: HandleOutlineBuilder = (width, height) => [
  ellipsePoints(getOutlineBox(width, height)),
];

const diamondOutline: HandleOutlineBuilder = (width, height) => [
  diamondPoints(getOutlineBox(width, height)),
];

const squareDiamondOutline: HandleOutlineBuilder = (_, height) =>
  diamondOutline(height, height);

const doubleCircleOutline: HandleOutlineBuilder = (_, height) => {
  const front = getOutlineBox(height, height);
  const shift = (height - 2 * DEFAULT_STROKE_WIDTH) / 8;

  return [ellipsePoints(front), ellipsePoints({ ...front, x: shift })];
};

const handleOutlineMap = {
  // cooperation model
  transaction: ellipseOutline,
  multiple_transaction_kind: doubleCircleOutline,
  // transaction pattern diagram
  c_fact: ellipseOutline,
  initiation_fact: ellipseOutline,
  transaction_kind: squareDiamondOutline,
  // object fact diagram
  production_event: diamondOutline,
} satisfies Partial<Record<keyof typeof shapeMap, HandleOutlineBuilder>>;

export type HandleOutlineNodeType = keyof typeof handleOutlineMap;

export const hasHandleOutline = (
  type?: string,
): type is HandleOutlineNodeType => !!type && type in handleOutlineMap;

export default handleOutlineMap;
