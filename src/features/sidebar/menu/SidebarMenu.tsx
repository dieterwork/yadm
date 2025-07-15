import type { AriaMenuProps } from "react-aria";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import { useRef, type RefObject } from "react";
import SidebarMenuSection from "./SidebarMenuSection";
import type {
  SidebarMenuItem,
  SidebarMenuSectionItem,
  SidebarMenuSection as SidebarMenuSectionType,
} from "./types";

interface SidebarMenuProps<T> extends AriaMenuProps<T> {
  ref?: RefObject<HTMLUListElement>;
}

const SidebarMenu = <T extends SidebarMenuItem[]>({
  ref,
  ...restProps
}: SidebarMenuProps<T>) => {
  // Create menu state based on the incoming props
  const state = useTreeState(restProps);

  // Get props for the menu element
  ref = ref ? ref : useRef<HTMLUListElement>(null!);
  const { menuProps } = useMenu({ ...restProps }, state, ref);

  return (
    <ul {...menuProps} ref={ref} className="grid grid-cols-2 gap-4 w-[264px]">
      {/* {[...state.collection].map((section) => (
        <SidebarMenuSection key={section.key} state={state} {...restProps} />
      ))} */}
    </ul>
  );
};

export default SidebarMenu;
