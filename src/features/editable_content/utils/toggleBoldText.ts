import type { KeyboardEvent } from "react";

export const toggleBoldText = (e: KeyboardEvent<HTMLDivElement>) => {
  e.preventDefault();
  document.execCommand("bold");
};
