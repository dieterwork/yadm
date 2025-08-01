import type { Scope } from "../../features/nodes/cooperation_model/cooperation_model.types";

export const getScopeFill = (scope: Scope, color?: string) => {
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
