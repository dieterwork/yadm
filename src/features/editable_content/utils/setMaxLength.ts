import type { InputEvent } from "react";

export const setMaxLength = (
  e: InputEvent<HTMLSpanElement>,
  element: HTMLSpanElement,
  maxLength: number
) => {
  if ((element.textContent?.length ?? 0) >= maxLength) {
    e.preventDefault();
    return;
  }
};
