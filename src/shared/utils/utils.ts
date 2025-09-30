import type { NodeScope } from "$/features/nodes/nodes.types";

export const getScopeFill = (scope: NodeScope, color?: string) => {
  if (scope === "out") return "var(--color-slate-500)";

  if (color === "default" || !color) {
    return "none";
  }

  return color;
};

export const getStateFill = (state: string, color?: string) => {
  if (state === "external") return "var(--color-slate-500)";

  if (color === "default" || !color) {
    return "none";
  }

  return color;
};
