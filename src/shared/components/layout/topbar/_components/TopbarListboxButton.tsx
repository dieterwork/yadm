import { cn } from "@sglara/cn";
import type { ReactNode } from "react";
import {
  Button,
  ListBox,
  Menu,
  MenuTrigger,
  Popover,
  type ButtonProps,
  type ListBoxProps,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

type TopbarButtonProps<T> = ListBoxProps<T> & {
  children?: ReactNode;
  label?: string;
};

const TopbarListboxButton = <T extends object>({
  label,
  children,
  ...restProps
}: TopbarButtonProps<T>) => {
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
        <ListBox {...restProps} className="flex flex-col outline-hidden" />
      </Popover>
    </MenuTrigger>
  );
};

export default TopbarListboxButton;
