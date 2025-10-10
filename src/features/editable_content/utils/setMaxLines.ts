import type { CSSProperties, InputEvent } from "react";

export const setMaxLines = (
  e: InputEvent<HTMLDivElement>,
  element: HTMLElement,
  maxLines: number,
  fontSize: number,
  leading: number,
  textAlign: CSSProperties["textAlign"]
) => {
  const maxLinesHeight = Math.round(fontSize * leading * maxLines);
  // create copy of el;
  const childrenHeightEl = document.createElement("div");
  // apply leading, font size, and font family stylings
  childrenHeightEl.style.fontFamily = "var(--font-app)";
  childrenHeightEl.style.fontSize = fontSize + "px";
  childrenHeightEl.style.lineHeight = String(leading);
  childrenHeightEl.style.width = element.offsetWidth + "px";
  childrenHeightEl.style.maxWidth = element.offsetWidth + "px";
  childrenHeightEl.style.whiteSpace = "prewrap";
  childrenHeightEl.style.wordBreak = "break-all";
  childrenHeightEl.style.textAlign = textAlign ?? "initial";
  // clone el
  const clonedElement = element.cloneNode(true);
  // create append all nodes to new element
  for (const child of clonedElement.childNodes) {
    childrenHeightEl.appendChild(child);
  }
  // append new char(s) being typed/pasted
  childrenHeightEl.appendChild(document.createTextNode(e.data));
  document.body.appendChild(childrenHeightEl);
  const childrenHeight = Math.round(
    childrenHeightEl.getBoundingClientRect().height
  );
  document.body.removeChild(childrenHeightEl);
  if (childrenHeight > maxLinesHeight) {
    e.preventDefault();
    return;
  }
};
