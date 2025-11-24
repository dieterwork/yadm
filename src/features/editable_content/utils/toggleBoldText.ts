import type { KeyboardEvent } from "react";
import { getCurrentFocusedText } from "./getCurrentFocusedText";
import { getSelectionOffset } from "./getSelectionOffset";
import { setSelectionOffset } from "./setSelectionOffset";

export const toggleBoldText = (e: KeyboardEvent<HTMLDivElement>) => {
  e.preventDefault();
  document.execCommand("bold");
};
