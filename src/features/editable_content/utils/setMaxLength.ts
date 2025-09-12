import type { KeyboardEvent } from "react";

export const setMaxLength = (
  e: KeyboardEvent<HTMLDivElement>,
  maxLength: number
) => {
  const target = e.currentTarget;
  if (!(target instanceof Node)) throw new Error("Target is not a node");
  if (
    target.innerText.length >= maxLength &&
    e.key !== "Backspace" &&
    e.key !== "Delete"
  ) {
    e.preventDefault();
    return;
  }
};
