import { Tooltip, type TooltipProps } from "react-aria-components";
import { cn } from "@sglara/cn";
import type { Orientation } from "react-aria";

type DEMOTooltipProps = Omit<TooltipProps, "children"> & {
  label?: string;
  orientation?: Orientation;
  keyboardControlLabel?: string;
};
const DEMOModelerToolbarTooltip = ({
  label,
  keyboardControlLabel,
  orientation,
  ...restProps
}: DEMOTooltipProps) => {
  return (
    <Tooltip
      {...restProps}
      placement={orientation === "horizontal" ? "top" : "right"}
      className={cn(
        "flex items-center gap-2 p-2 rounded-sm text-xs bg-slate-900 outline-hidden entering:animate-in exiting:animate-out entering:fade-in exiting:fade-out entering:zoom-in-100 exiting:zoom-out-90"
      )}
    >
      <span className="text-white">{label}</span>
      {keyboardControlLabel && (
        <span className="text-slate-300">{keyboardControlLabel}</span>
      )}
    </Tooltip>
  );
};

export default DEMOModelerToolbarTooltip;
