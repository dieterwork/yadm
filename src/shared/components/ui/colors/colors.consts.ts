import type { NodeColor } from "./colors.types";

export const NODE_COLOR_MAP = {
  default: "var(--color-white)",
  red: "var(--color-rose-500)",
  blue: "var(--color-sky-500)",
  green: "var(--color-emerald-500)",
  yellow: "var(--color-yellow-500)",
} as const;

export const NODE_BACKGROUND_COLOR_MAP = {
  default: "var(--color-white)",
  red: "var(--color-rose-300)",
  blue: "var(--color-sky-300)",
  green: "var(--color-emerald-300)",
  yellow: "var(--color-yellow-300)",
} as const;

export const NODE_BORDER_COLOR_MAP = {
  default: "var(--color-slate-900)",
  red: "var(--color-rose-500)",
  blue: "var(--color-sky-500)",
  green: "var(--color-emerald-500)",
  yellow: "var(--color-yellow-500)",
} as const;

export const ORGANIZATION_BACKGROUND_COLOR_MAP = {
  default: "var(--color-rose-300)",
  blue: "var(--color-sky-300)",
  green: "var(--color-emerald-300)",
  yellow: "var(--color-yellow-300)",
  black: "var(--color-white)",
} as const;

export const ORGANIZATION_BORDER_COLOR_MAP = {
  default: "var(--color-rose-500)",
  blue: "var(--color-sky-500)",
  green: "var(--color-emerald-500)",
  yellow: "var(--color-yellow-500)",
  black: "var(--color-slate-900)",
} as const;
