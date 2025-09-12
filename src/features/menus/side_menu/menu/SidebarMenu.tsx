import type { AriaMenuProps } from "react-aria";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import { MenuItem, MenuSection } from "react-aria-components";
import { useRef } from "react";
import SidebarMenuSection from "./SidebarMenuSection";

const SidebarMenu = <T extends object>(props: AriaMenuProps<T>) => {
  // Create menu state based on the incoming props
  let state = useTreeState(props);

  // Get props for the menu element
  let ref = useRef(null);
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul {...menuProps} ref={ref}>
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <SidebarMenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
};

export default SidebarMenu;
