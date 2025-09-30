export type ReactStyleStateSetter<T> = T | ((prev: T) => T);

export const ALL_NODE_TEXT_ALIGN_OPTIONS = ["start", "center", "end"] as const;

export type NodeTextAlign = (typeof ALL_NODE_TEXT_ALIGN_OPTIONS)[number];

export function isNodeTextAlign(value: string): value is NodeTextAlign {
  return ALL_NODE_TEXT_ALIGN_OPTIONS.includes(value as NodeTextAlign);
}
