import type { Position } from "@xyflow/react";

type Translate = { x: string; y: string };

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
