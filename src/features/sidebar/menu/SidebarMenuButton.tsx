import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useId, useState } from "react";
import {
  Button,
  Label,
  Menu,
  MenuTrigger,
  Popover,
  Select,
  type ButtonProps,
  type ListBoxProps,
  type MenuProps,
  type MenuTriggerProps,
  type PressEvent,
  type SelectProps,
} from "react-aria-components";
import SidebarMenu from "./SidebarMenu";

type SidebarMenuButtonProps = ButtonProps & {
  label?: string;
  isOpen?: boolean;
};

const SidebarMenuButton = ({
  label,
  isOpen,
  ...restProps
}: SidebarMenuButtonProps) => {
  return (
    <Button
      {...restProps}
      className="outline-hidden flex justify-between items-center gap-2 h-[3rem] font-medium text-sm w-[264px]"
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
  );
};

export default SidebarMenuButton;
