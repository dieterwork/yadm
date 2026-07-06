import type { Position } from "@xyflow/react";

type Translate = { x: string; y: string };

// For straight (angled) lines, the line meets the node's flat edge forming a
// triangle. Each of the two labels sits in one of the two wedges of that
// triangle (label0 = "top"/"left" wedge, label1 = "bottom"/"right" wedge),
// placed along the wedge's bisector — between the node-edge ray and the line
// direction. `lineDir` is the direction the line travels away from the handle.
export const getStraightLabelTranslate = (
  position: Position,
  lineDir: { x: number; y: number },
  index: 0 | 1,
): Translate => {
  const distance = 16; // px from the handle along the bisector

  // The node's flat edge is perpendicular to the handle normal: vertical for
  // left/right handles, horizontal for top/bottom. label0 takes the ray with
  // the smaller coordinate (up / left), label1 the opposite.
  const isVertical = position === "left" || position === "right";
  const ray = isVertical
    ? index === 0
      ? { x: 0, y: -1 }
      : { x: 0, y: 1 }
    : index === 0
      ? { x: -1, y: 0 }
      : { x: 1, y: 0 };

  const len = Math.hypot(lineDir.x, lineDir.y) || 1;
  const dir = { x: lineDir.x / len, y: lineDir.y / len };

  let bx = ray.x + dir.x;
  let by = ray.y + dir.y;
  const blen = Math.hypot(bx, by) || 1;
  bx = (bx / blen) * distance;
  by = (by / blen) * distance;

  return {
    x: `calc(-50% + ${bx.toFixed(2)}px)`,
    y: `calc(-50% + ${by.toFixed(2)}px)`,
  };
};

// For straight lines, the middle labels sit at the edge midpoint offset
// perpendicular to the line: label0 on the upper side, label1 on the lower.
export const getStraightMiddleLabelTranslate = (
  lineDir: { x: number; y: number },
  index: 0 | 1,
): Translate => {
  const distance = 14; // px from the line, perpendicular

  const len = Math.hypot(lineDir.x, lineDir.y) || 1;
  const dir = { x: lineDir.x / len, y: lineDir.y / len };

  // Perpendicular to the line, normalised to point "up" (negative y).
  let perp = { x: -dir.y, y: dir.x };
  if (perp.y > 0) perp = { x: -perp.x, y: -perp.y };

  const sign = index === 0 ? 1 : -1;
  const ox = perp.x * distance * sign;
  const oy = perp.y * distance * sign;

  return {
    x: `calc(-50% + ${ox.toFixed(2)}px)`,
    y: `calc(-50% + ${oy.toFixed(2)}px)`,
  };
};

// Source labels — positioned at the point where the line exits the source handle.
// Horizontal exits (left/right): labels stack above and below the line.
// Vertical exits (top/bottom): labels sit left and right of the line.

export const getStartLabel0Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "right":
      return { x: "0", y: "-100%" };
    case "left":
      return { x: "-100%", y: "-100%" };
    case "top":
      return { x: "-100%", y: "-100%" };
    case "bottom":
      return { x: "-100%", y: "0" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};

export const getStartLabel1Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "right":
      return { x: "0", y: "0" };
    case "left":
      return { x: "-100%", y: "0" };
    case "top":
      return { x: "0", y: "-100%" };
    case "bottom":
      return { x: "0", y: "0" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};

// Middle labels — placed at the edge midpoint.
// Direction is derived from arrowRotation: horizontal arrow → labels above/below,
// vertical arrow → labels left/right.

export const getMiddleLabel0Translate = (
  direction: "horizontal" | "vertical",
): Translate =>
  direction === "horizontal"
    ? { x: "-50%", y: "-105%" }
    : { x: "-105%", y: "-50%" };

export const getMiddleLabel1Translate = (
  direction: "horizontal" | "vertical",
): Translate =>
  direction === "horizontal" ? { x: "-50%", y: "5%" } : { x: "5%", y: "-50%" };

// End labels — positioned at the point where the line arrives at the target handle.

export const getEndLabel0Translate = (targetPosition: Position) => {
  switch (targetPosition) {
    case "right":
      return { x: "0", y: "-100%" };
    case "left":
      return { x: "-100%", y: "-100%" };
    case "top":
      return { x: "-100%", y: "-100%" };
    case "bottom":
      return { x: "-100%", y: "0" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};

export const getEndLabel1Translate = (targetPosition: Position) => {
  switch (targetPosition) {
    case "right":
      return { x: "0", y: "0" };
    case "left":
      return { x: "-100%", y: "0" };
    case "top":
      return { x: "0", y: "-100%" };
    case "bottom":
      return { x: "0", y: "0" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};
