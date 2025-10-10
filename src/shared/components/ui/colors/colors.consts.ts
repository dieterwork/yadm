import type { NodeColor } from "./colors.types";

export const ALL_NODE_COLORS = [
  "default",
  "blue",
  "red",
  "green",
  "yellow",
] as const;

export type ColorMap = { [key in NodeColor]: string };

export const NODE_COLOR_MAP = {
  default: "var(--color-white)",
  red: "var(--color-red-500)",
  blue: "var(--color-sky-500)",
  green: "var(--color-emerald-500)",
  yellow: "var(--color-yellow-500)",
} satisfies ColorMap;

export const NODE_BACKGROUND_COLOR_MAP = {
  default: "var(--color-white)",
  red: "var(--color-red-200)",
  blue: "var(--color-sky-300)",
  green: "var(--color-emerald-300)",
  yellow: "var(--color-yellow-300)",
} satisfies ColorMap;

export const NODE_BORDER_COLOR_MAP = {
  default: "var(--color-slate-900)",
  red: "var(--color-red-500)",
  blue: "var(--color-sky-500)",
  green: "var(--color-emerald-500)",
  yellow: "var(--color-yellow-500)",
} satisfies ColorMap;
