import type { NodeFocus } from "$/features/nodes/nodes.types";
import { NODE_BACKGROUND_COLOR_MAP } from "../components/ui/colors/colors.consts";

export const getFocusFill = (focus: NodeFocus, color?: string) => {
  if (focus === "out") return NODE_BACKGROUND_COLOR_MAP["gray"];

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
