import isPrintableChar from "$/shared/utils/isPrintableChar";
import type { InputEvent, KeyboardEvent } from "react";

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
