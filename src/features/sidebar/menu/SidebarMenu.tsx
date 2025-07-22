import type { AriaMenuProps } from "react-aria";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import SidebarMenuSection from "./SidebarMenuSection";
import { useRef } from "react";

const SidebarMenu = <T extends object>(props: AriaMenuProps<T>) => {
  // Create menu state based on the incoming props
  let state = useTreeState(props);

  // Get props for the menu element
  const ref = useRef(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul {...menuProps} ref={ref}>
      {[...state.collection].map((item) => (
        <SidebarMenuSection key={item.key} section={item} state={state} />
      ))}
    </ul>
  );
};

export default SidebarMenu;
