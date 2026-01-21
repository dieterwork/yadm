import { CheckIcon, type IconProps } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import type { ReactElement } from "react";
import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";

type DEMOElementToolbarListBoxItemProps = ListBoxItemProps & {
  icon?: ({
    size,
    color,
  }: {
    size: number;
    color: string;
  }) => ReactElement<IconProps | { color: string }>;
  label?: string;
};

const DEMOElementToolbarListBoxItem = ({
  icon,
  label,
  ...restProps
}: DEMOElementToolbarListBoxItemProps) => {
  return (
    <ListBoxItem
      {...restProps}
      className={({ isSelected, isDisabled }) =>
        cn(
          "outline-hidden nodrag nopan cursor-pointer select-none flex items-center justify-between text-slate-900 text-xs leading-none mx-1 px-2 h-[2rem] rounded-md",
          isSelected ? "bg-sky-100" : "hover:bg-slate-100 bg-white",
          isDisabled ? "opacity-30" : "opacity-100"
        )
      }
    >
      {({ isSelected }) => (
        <>
          <div className="flex items-center gap-1.5">
            {icon && typeof icon === "function" && (
              <span className={cn("icon-wrapper")}>
                {icon({ size: 16, color: "var(--color-slate-900)" })}
              </span>
            )}
            <span
              className={cn(
                isSelected ? "text-sky-900" : "text-slate-900",
                "font-medium"
              )}
            >
              {label}
            </span>
          </div>
          {isSelected && <CheckIcon color="var(--color-sky-900)" size={16} />}
        </>
      )}
    </ListBoxItem>
  );
};

export default DEMOElementToolbarListBoxItem;
