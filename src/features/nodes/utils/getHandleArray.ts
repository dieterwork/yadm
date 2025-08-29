import type { CSSProperties } from "react";
import uuid from "../../../shared/utils/uuid";
import { MEDIUM_NODE_SIZE } from "./consts";
import type { Position } from "@xyflow/react";

export const getHandleParams = ({
  size = MEDIUM_NODE_SIZE,
  defaultSize = MEDIUM_NODE_SIZE,
  direction = "horizontal",
}: {
  size?: number;
  defaultSize?: number;
  direction?: "horizontal" | "vertical";
}) => {
  const num = Math.floor(size / defaultSize);
  const arr = new Array(num).fill(null).map((_, i) => {
    return {
      id: uuid(),
      style: {
        top: direction === "vertical" ? (i / num) * size : undefined,
        left: direction === "horizontal" ? (i / num) * size : undefined,
      },
    };
  });
  return arr;
};
