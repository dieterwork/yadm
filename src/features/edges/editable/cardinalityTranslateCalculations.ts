import type { Position } from "@xyflow/react";

export const getStartLabel0Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
      return "";
    case "right":
      return "-100%";
    case "top":
      return "-100%";
    case "bottom":
      return "-100%";
    default:
      return "0";
  }
};

export const getStartLabel1Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
      return "";
    case "right":
      return "-100%";
    case "top":
      return "-100%";
    case "bottom":
      return "-100%";
    default:
      return "0";
  }
};

export const getMiddleLabel1Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
    case "right":
      return "-100%";
    default:
      return "0";
  }
};

export const getMiddleLabel2Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
    case "right":
      return "-100%";
    default:
      return "0";
  }
};

export const getEndLabel1Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
    case "right":
      return "-100%";
    default:
      return "0";
  }
};
export const getEndLabel2Translate = (sourcePosition: Position) => {
  switch (sourcePosition) {
    case "left":
    case "right":
      return "-100%";
    default:
      return "0";
  }
};
