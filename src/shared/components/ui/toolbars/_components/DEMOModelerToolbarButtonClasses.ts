import { cn } from "@sglara/cn";
import type { CSSProperties } from "react";

const DEMOModelerToolbarButtonClasses = (
  isHovered: boolean,
  isPressed: boolean,
  isActive?: boolean
) =>
  cn(
    "transition-colors cursor-pointer select-none outline-none text-slate-900 h-8 w-8 grid place-items-center rounded-md font-semibold text-sm",
    isHovered ? "bg-slate-200" : "bg-slate-50",
    (isPressed || isActive) && "bg-slate-300"
  );

export default DEMOModelerToolbarButtonClasses;
