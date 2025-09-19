import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useState } from "react";
import {
  Button,
  Menu,
  MenuTrigger,
  Popover,
  type ButtonProps,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";
import SidebarMenu from "./SidebarMenu";

type TopbarMenuButtonProps<T> = MenuProps<T> &
  Omit<MenuTriggerProps, "children"> & {
    label?: string;
  };

const SidebarMenuButton = <T extends object>({
  label,
  children,
  ...restProps
}: TopbarMenuButtonProps<T>) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <MenuTrigger {...restProps}>
        <Button
          className="outline-hidden flex justify-between items-center gap-2 h-[3rem] font-medium text-sm w-[264px]"
          onPress={() => {
            setOpen((isOpen) => !isOpen);
          }}
        >
          {label}
          <CaretDownIcon
            size={12}
            className={cn(
              isOpen ? "-rotate-180" : "rotate-0",
              "transition ease-linear duration-150"
            )}
          />
        </Button>
        <SidebarMenu
          {...restProps}
          isOpen={isOpen}
          className="flex flex-col gap-6 mt-2 mb-8"
        >
          {children}
        </SidebarMenu>
      </MenuTrigger>
    </div>
  );
};

export default SidebarMenuButton;
