import { CaretDownIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { AriaButtonProps, AriaMenuTriggerProps } from "react-aria";
import { Button, Menu, MenuTrigger } from "react-aria-components";

interface SidebarMenuButtonProps extends AriaMenuTriggerProps {
  label: string;
  icon?: string;
  children?: ReactNode;
}

const SidebarMenuButton = ({
  label,
  icon,
  children,
  ...restProps
}: SidebarMenuButtonProps) => {
  return (
    <>
      <MenuTrigger {...restProps}>
        <Button className="flex items-center gap-2 px-4 py-4 font-medium text-sm w-[264px]">
          <div className="bg-red-500 w-7 aspect-square"></div>
          {label}
          <CaretDownIcon size={12} className="ml-auto" />
        </Button>
        {children}
      </MenuTrigger>
    </>
  );
};

export default SidebarMenuButton;
