import { cn } from "@sglara/cn";
import {
  Button,
  Menu,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
  type ButtonProps,
  type MenuProps,
  type MenuTriggerProps,
  type SubmenuTriggerProps,
} from "react-aria-components";
import TopbarMenuItem from "./TopbarMenuItem";

type TopbarSubMenuButtonProps<T> = MenuProps<T> &
  Omit<SubmenuTriggerProps, "children"> & {
    label?: string;
  };

const TopbarSubMenuButton = <T extends object>({
  label,
  children,
  ...restProps
}: TopbarSubMenuButtonProps<T>) => {
  return (
    <SubmenuTrigger {...restProps}>
      <TopbarMenuItem>{label}</TopbarMenuItem>
      <Popover className="outline-hidden p-1 w-45 overflow-auto rounded-md bg-white shadow-xs border-1 border-slate-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left">
        <Menu {...restProps} className="outline-hidden">
          {children}
        </Menu>
      </Popover>
    </SubmenuTrigger>
  );
};

export default TopbarSubMenuButton;
