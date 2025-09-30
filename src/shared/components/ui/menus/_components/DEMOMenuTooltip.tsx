import type { ReactNode } from "react";
import { Tooltip, type TooltipProps } from "react-aria-components";
import useDEMOMenuContext from "./useDEMOMenuContext";
import { cn } from "@sglara/cn";

type DEMOTooltipProps = Omit<TooltipProps, "children"> & {
  label?: string;
  children?: ReactNode;
  keyboardControlLabel?: string;
};
const DEMOMenuTooltip = ({
  label,
  keyboardControlLabel,
  children,
  ...restProps
}: DEMOTooltipProps) => {
  const { direction } = useDEMOMenuContext();
  return (
    <Tooltip
      {...restProps}
      placement={direction === "horizontal" ? "right" : "top"}
      className={cn(
        "w-5 h-5 bg-slate-900 text-white outline-hidden entering:animate-in exiting:animate-out entering:fade-in exiting:fade-out entering:zoom-in-100 exiting:zoom-out-95"
      )}
      style={{ transform: "translate3d(0,0,0)" }}
    >
      <span>{label}</span>
      <span>{keyboardControlLabel}</span>
    </Tooltip>
  );
};

export default DEMOMenuTooltip;
