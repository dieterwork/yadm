import {
  Menu,
  Popover,
  SubmenuTrigger,
  type MenuProps,
  type SubmenuTriggerProps,
} from "react-aria-components";
import TopbarMenuItem from "./TopbarMenuItem";
import { cn } from "@sglara/cn";

type TopbarSubMenuButtonProps<T> = MenuProps<T> &
  Omit<SubmenuTriggerProps, "children"> & {
    label?: string;
    size?: "small" | "medium" | "large";
  };

const TopbarSubMenuButton = <T extends object>({
  label,
  children,
  size,
  ...restProps
}: TopbarSubMenuButtonProps<T>) => {
  return (
    <SubmenuTrigger {...restProps}>
      <TopbarMenuItem>{label}</TopbarMenuItem>
      <Popover
        className={cn(
          size === "small" && "w-35",
          size === "medium" && "w-45",
          size === "large" && "w-55",
          "outline-hidden p-1 w-45 overflow-auto rounded-md bg-white shadow-xs border-1 border-slate-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left"
        )}
      >
        <Menu {...restProps} className="outline-hidden">
          {children}
        </Menu>
      </Popover>
    </SubmenuTrigger>
  );
};

export default TopbarSubMenuButton;
