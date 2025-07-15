import { useRef, type RefObject } from "react";
import {
  mergeProps,
  useDraggableItem,
  useFocusRing,
  useMenuItem,
  type MenuItemAria,
} from "react-aria";
import type { DraggableCollectionState, Node, TreeState } from "react-stately";
import type { SidebarMenuItem, SidebarMenuSectionItem } from "./types";

interface SidebarMenuSectionItemProps<T> extends MenuItemAria {
  ref?: RefObject<HTMLLIElement>;
  item: Node<T>;
  state: TreeState<T>;
  dragState: DraggableCollectionState;
}

const SidebarMenuSectionItem = ({
  ref,
  item,
  state,
  dragState,
}: SidebarMenuSectionItemProps<SidebarMenuSectionItem>) => {
  // Setup listbox option as normal. See useListBox docs for details.
  if (!ref) ref = useRef(null!);
  const { menuItemProps } = useMenuItem({ key: item.key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  // Register the item as a drag source.
  const { dragProps } = useDraggableItem(
    {
      key: item.key,
    },
    dragState
  );

  // Merge option props and dnd props, and render the item.
  return (
    <li
      {...mergeProps(menuItemProps, dragProps, focusProps)}
      ref={ref}
      className={`${
        isFocusVisible ? "focus-visible" : ""
      } grid place-items-center shadow-sm gap-2 px-4 py-4 aspect-square`}
    >
      <div className="bg-red-500 w-10 aspect-square"></div>
      <div className="font-medium text-center text-sm">{item.rendered}</div>
    </li>
  );
};

export default SidebarMenuSectionItem;
