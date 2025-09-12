import type { KeyboardEvent } from "react";
import { getCurrentFocusedText } from "./getCurrentFocusedText";
import { getSelectionOffset } from "./getSelectionOffset";
import { setSelectionOffset } from "./setSelectionOffset";

export const toggleBoldText = (e: KeyboardEvent<HTMLDivElement>) => {
  e.preventDefault();
  const target = e.currentTarget;
  const text = getCurrentFocusedText();
  if (!text) throw new Error("Could not find text");
  // get current selection
  const [start, end] = getSelectionOffset(target);
  const elements = target.querySelectorAll<HTMLElement>("*");
  if (elements.length === 0) {
    // must be inner text
    target.innerHTML = "<b>" + target.innerText + "</b>";
  }
  let currentEl: HTMLElement | null = null;
  for (const el of elements) {
    if (!(el instanceof Node))
      throw new Error("Element is not an HTML element");
    if (el.innerText.trim() === text.trim()) {
      currentEl = el;
    }
  }
  if (!currentEl) return;
  if (currentEl?.nodeName === "B") {
    const parentDiv = currentEl.parentNode;
    if (!parentDiv || !(parentDiv instanceof Element)) return;
    parentDiv.innerHTML = text;
  } else if (currentEl.nodeName === "DIV") {
    currentEl.innerHTML = "<b>" + text + "</b>";
  }
  setSelectionOffset(target, start, end);
};
