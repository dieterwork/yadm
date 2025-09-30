import type { KeyboardEvent as KeyboardEventType } from "react";

export default function isPrintableChar<T extends HTMLElement>(
  e: KeyboardEvent | KeyboardEventType<T>
) {
  return [...e.key].length === 1;
}
