import type { MenuTriggerProps } from "react-stately";
import { useMenuTrigger, type AriaMenuProps } from "react-aria";
import { useMenuTriggerState } from "react-stately";
import { Button } from "react-aria-components";
import SidebarMenu from "./SidebarMenu";
import { useRef, type RefObject } from "react";
import type { SidebarMenuItem, SidebarMenuSection } from "./types";
import { CaretDownIcon } from "@phosphor-icons/react";

interface SidebarMenuTriggerProps<T>
  extends AriaMenuProps<T>,
    MenuTriggerProps {
  label?: string;
  ref?: RefObject<HTMLButtonElement>;
}

const SidebarMenuTrigger = <T extends SidebarMenuItem>({
  label,
  ref,
  ...restProps
}: SidebarMenuTriggerProps<T>) => {
  // Create state based on the incoming props
  const state = useMenuTriggerState(restProps);

  // Get props for the button and menu elements
  if (!ref) ref = useRef<HTMLButtonElement>(null!);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <div className="sidebar-menu-trigger-wrapper">
        <Button
          {...menuTriggerProps}
          ref={ref}
          className="flex items-center gap-2 px-4 py-4 font-medium text-sm w-[264px]"
        >
          <div className="bg-red-500 w-7 aspect-square"></div>
          {label}
          <CaretDownIcon size={12} className="ml-auto" />
        </Button>
        {state.isOpen && <SidebarMenu {...restProps} {...menuProps} />}
      </div>
    </>
  );
};

export default SidebarMenuTrigger;
