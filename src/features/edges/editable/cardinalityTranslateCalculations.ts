import type { Position } from "@xyflow/react";

type Translate = { x: string; y: string };

export const getStraightLabelTranslate = (
  lineDir: { x: number; y: number },
  index: 0 | 1,
): Translate => {
  const along = 16; // px the pair is shifted away from the handle along the line
  const gap = 12;

  const len = Math.hypot(lineDir.x, lineDir.y) || 1;
  const dir = { x: lineDir.x / len, y: lineDir.y / len };

  const ox = dir.x * along;
  const oy = dir.y * along + (index === 0 ? -gap : gap);

  return {
    x: `calc(-50% + ${ox.toFixed(2)}px)`,
    y: `calc(-50% + ${oy.toFixed(2)}px)`,
  };
};

export const getStraightMiddleLabelTranslate = (
  lineDir: { x: number; y: number },
  index: 0 | 1,
  law?: "precedence" | "exclusion",
): Translate => {
  const perpDist = 0; // px the pair is shifted off the line
  const gap = 12 + (law === "exclusion" ? 8 : 0); // half the vertical gap between the two stacked labels

  const len = Math.hypot(lineDir.x, lineDir.y) || 1;
  const dir = { x: lineDir.x / len, y: lineDir.y / len };

  // Perpendicular to the line, normalised to point "up" (negative y).
  let perp = { x: -dir.y, y: dir.x };
  if (perp.y > 0) perp = { x: -perp.x, y: -perp.y };

  const ox = perp.x * perpDist;
  const oy = perp.y * perpDist + (index === 0 ? -gap : gap);

  return {
    x: `calc(-50% + ${ox.toFixed(2)}px)`,
    y: `calc(-50% + ${oy.toFixed(2)}px)`,
  };
};

// Source labels — positioned at the point where the line exits the source handle.
// Horizontal exits (left/right): labels stack above and below the line.
// Vertical exits (top/bottom): labels sit left and right of the line.

export const getStartLabel0Translate = (
  sourcePosition: Position,
) => {
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

export const getStartLabel1Translate = (
  sourcePosition: Position,
) => {
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

export const getMiddleLabel0Translate = (
  direction: "horizontal" | "vertical",
  law?: "exclusion" | "precedence",
): Translate =>
  direction === "horizontal"
    ? { x: "-50%", y: `calc(-105% - ${law === "exclusion" ? "8px" : "0px"})` }
    : { x: `calc(-105% - ${law === "exclusion" ? "8px" : "0px"})`, y: "-50%" };

export const getMiddleLabel1Translate = (
  direction: "horizontal" | "vertical",
  law?: "exclusion" | "precedence",
): Translate =>
  direction === "horizontal" ? { x: "-50%", y: `calc(5% + ${law === "exclusion" ? "8px" : "0px"})` } : { x: `calc(5% + ${law === "exclusion" ? "8px" : "0px"})`, y: "-50%" };

// End labels — positioned at the point where the line arrives at the target handle.

export const getEndLabel0Translate = (targetPosition: Position, law?: "exclusion" | "precedence") => {
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

export const getEndLabel1Translate = (targetPosition: Position, law?: "exclusion" | "precedence") => {
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
