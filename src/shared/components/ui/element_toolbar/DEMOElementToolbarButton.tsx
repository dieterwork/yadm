import { CaretRightIcon, type IconProps } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import type { ReactElement } from "react";
import { Button, type ButtonProps } from "react-aria-components";

type DEMOElementToolbarButtonProps = ButtonProps & {
  icon: ({
    size,
    color,
  }: {
    size: number;
    color: string;
  }) => ReactElement<IconProps>;
  label?: string;
  state?: "danger" | "default";
  menuTrigger?: boolean;
};

const DEMOElementToolbarButton = ({
  icon,
  label,
  state,
  menuTrigger,
  ...restProps
}: DEMOElementToolbarButtonProps) => {
  return (
    <Button
      {...restProps}
      className="outline-hidden nodrag nopan cursor-pointer select-none flex items-center justify-between text-slate-900 text-xs leading-none mx-1 hover:bg-slate-100 px-2 h-[32px] rounded-md"
    >
      {({ isDisabled }) => (
        <>
          <div className="flex items-center gap-1.5">
            {icon && typeof icon === "function" && (
              <span
                className={cn(
                  "icon-wrapper",
                  isDisabled ? "opacity-30" : "opacity-100"
                )}
              >
                {icon({
                  size: 16,
                  color:
                    state === "danger"
                      ? "var(--color-rose-500"
                      : "var(--color-slate-900)",
                })}
              </span>
            )}
            <span
              className={cn(
                state === "danger" ? "text-rose-500" : "text-slate-900",
                isDisabled ? "opacity-30" : "opacity-100",
                "font-medium"
              )}
            >
              {label}
            </span>
          </div>
          {menuTrigger && (
            <CaretRightIcon size={12} color="var(--color-slate-700)" />
          )}
        </>
      )}
    </Button>
  );
};

export default DEMOElementToolbarButton;
