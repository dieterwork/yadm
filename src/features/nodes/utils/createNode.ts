import type { XYPosition } from "@xyflow/react";
import type { DEMONode } from "../nodes.types";
import uuid from "../../../shared/utils/uuid";
import { DEFAULT_CONTENT_MAP, DEFAULT_SIZE_MAP } from "./consts";

export const createNode = <T extends string>(
  nodeType: "actor" | "transactor" | "transaction" | "self-activation",
  position: XYPosition
): DEMONode<T> => {
  switch (nodeType) {
    case "actor":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: {
          state: "default",
          content: DEFAULT_CONTENT_MAP[nodeType],
          scope: "in",
        },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    case "transaction":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    case "transactor":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    case "self-activation":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "black",
        },
        selected: true,
      };
    case "composite-ctar":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 4,
        },
        selected: true,
      };
    case "elementary-actor":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 4,
        },
        selected: true,
      };
    case "several-actors":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: DEFAULT_CONTENT_MAP[nodeType] },
        style: {
          width: DEFAULT_SIZE_MAP[nodeType].width,
          height: DEFAULT_SIZE_MAP[nodeType].height,
          fill: "white",
          stroke: "var(--color-slate-500)",
          strokeWidth: 4,
        },
        selected: true,
      };
    default:
      throw new Error(`Could not find node type ${nodeType}`);
  }
};
