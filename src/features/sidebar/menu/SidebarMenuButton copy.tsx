import type { MenuTriggerProps } from "react-stately";
import { useMenuTrigger, type AriaMenuProps } from "react-aria";
import { Item, useMenuTriggerState } from "react-stately";
import { Button } from "react-aria-components";
import SidebarMenu from "./SidebarMenu";
import { useRef } from "react";

// Reuse the Popover, and Button from your component library. See below for details.

interface MenuButtonProps<T> extends AriaMenuProps<T>, MenuTriggerProps {
  label?: string;
}

const SidebarMenuButton = <T extends object>(props: MenuButtonProps<T>) => {
  // Create state based on the incoming props
  let state = useMenuTriggerState(props);

  // Get props for the button and menu elements
  let ref = useRef(null);
  let { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <Button
        {...menuTriggerProps}
        ref={ref}
        style={{ height: 30, fontSize: 14 }}
      >
        {props.label}
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && <SidebarMenu {...props} {...menuProps} />}
    </>
  );
};

export default SidebarMenuButton;
