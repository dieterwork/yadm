import { cn } from "@sglara/cn";
import {
  Button,
  Menu,
  MenuTrigger,
  Popover,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

type TopbarMenuButtonProps<T> = MenuProps<T> &
  Omit<MenuTriggerProps, "children"> & {
    label?: string;
  };

const TopbarMenuButton = <T extends object>({
  label,
  children,
  ...restProps
}: TopbarMenuButtonProps<T>) => {
  return (
    <MenuTrigger {...restProps}>
      <Button
        className={cn(
          "text-slate-900 text-sm font-medium leading-none px-2.5 h-[1.875rem] content-center hover:bg-slate-100 data-[pressed]:bg-slate-200 transition-colors cursor-default outline-hidden focus-visible:bg-slate-100 rounded-sm"
        )}
      >
        {label}
      </Button>
      <Popover
        className={cn(
          "outline-hidden p-1 w-45 overflow-auto rounded-md bg-white shadow-xs border-1 border-slate-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left"
        )}
      >
        <Menu {...restProps} className="outline-hidden">
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};

export default TopbarMenuButton;
