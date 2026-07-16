import type { Position } from "@xyflow/react";

export const getStartLabel0Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "right":
      return { x: "4px", y: "calc(-100% - 4px)" };
    case "left":
      return { x: "calc(-100% - 4px)", y: "calc(-100% - 4px)" };
    case "top":
      return { x: "calc(-100% - 4px)", y: "calc(-100% - 4px)" };
    case "bottom":
      return { x: "calc(-100% - 4px)", y: "4px" };
    default:
      return { x: "-50%", y: "-50" };
  }
};

export const getStartLabel1Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "right":
      return { x: "4px", y: "4px" };
    case "left":
      return { x: "calc(-100% - 4px)", y: "4px" };
    case "top":
      return { x: "4px", y: "calc(-100% - 4px)" };
    case "bottom":
      return { x: "4px", y: "4px" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};

export const getMiddleLabel0Translate = (
  direction: "horizontal" | "vertical",
  law?: "exclusion" | "precedence",
) =>
  direction === "horizontal"
    ? {
        x: "calc(-50% - 4px)",
        y: `calc(-105% - ${law === "exclusion" ? "8px" : "0px"} - 4px)`,
      }
    : {
        x: `calc(-105% - ${law === "exclusion" ? "8px" : "0px"} - 4px)`,
        y: "calc(-50% - 4px)",
      };

export const getMiddleLabel1Translate = (
  direction: "horizontal" | "vertical",
  law?: "exclusion" | "precedence",
) =>
  direction === "horizontal"
    ? {
        x: "calc(-50% - 4px)",
        y: `calc(5% + ${law === "exclusion" ? "8px" : "0px"} + 4px)`,
      }
    : {
        x: `calc(5% + ${law === "exclusion" ? "8px" : "0px"} + 4px)`,
        y: "calc(-50% - 4px)",
      };

export const getEndLabel0Translate = (targetPosition: Position) => {
  switch (targetPosition) {
    case "right":
      return { x: "4px", y: "calc(-100% - 4px)" };
    case "left":
      return { x: "calc(-100% - 4px)", y: "calc(-100% - 4px)" };
    case "top":
      return { x: "calc(-100% - 4px)", y: "calc(-100% - 4px)" };
    case "bottom":
      return { x: "calc(-100% - 4px)", y: "4px" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};

export const getEndLabel1Translate = (targetPosition: Position) => {
  switch (targetPosition) {
    case "right":
      return { x: "4px", y: "4px" };
    case "left":
      return { x: "calc(-100% - 4px)", y: "4px" };
    case "top":
      return { x: "4px", y: "calc(-100% - 4px)" };
    case "bottom":
      return { x: "4px", y: "4px" };
    default:
      return { x: "-50%", y: "-50%" };
  }
};
