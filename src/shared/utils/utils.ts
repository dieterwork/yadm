import type { NodeScope } from "$/features/nodes/nodes.types";
import { NODE_BACKGROUND_COLOR_MAP } from "../components/ui/colors/colors.consts";

export const getScopeFill = (scope: NodeScope, color?: string) => {
  if (scope === "out") return NODE_BACKGROUND_COLOR_MAP["gray"];

  if (color === "default" || !color) {
    return "none";
  }

  return NODE_BACKGROUND_COLOR_MAP[color];
};

export const getStateFill = (state: string, color?: string) => {
  if (state === "external") return NODE_BACKGROUND_COLOR_MAP["gray"];

  if (color === "default" || !color) {
    return "none";
  }

  return NODE_BACKGROUND_COLOR_MAP[color];
};
