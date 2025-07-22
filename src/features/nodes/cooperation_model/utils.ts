import type { Scope } from "./cooperation_model.types";

export const getScopeFill = (scope: Scope, color?: string) => {
  if (scope === "out") return "var(--color-slate-500)";

  if (color === "default" || !color) {
    return "none";
  }

  return color;
};
