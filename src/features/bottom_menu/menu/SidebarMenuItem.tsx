import { cloneElement, useRef } from "react";
import { useMenuItem, type AriaMenuItemProps } from "react-aria";
import type { Node, TreeState } from "react-stately";

interface SidebarMenuItemProps<T> extends AriaMenuItemProps {
  item: Node<T>;
  state: TreeState<T>;
}

const SidebarMenuItem = <T extends object>({
  item,
  state,
}: SidebarMenuItemProps<T>) => {
  // Get props for the menu item element and child elements
  const ref = useRef(null);
  const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } =
    useMenuItem({ key: item.key }, state, ref);

  //   // Pull out the three expected children. We will clone them
  //   // and add the necessary props for accessibility.
  //   const [title, description, shortcut] = item.rendered;

  return (
    <li {...menuItemProps} ref={ref}>
      <div className="grid place-items-center shadow-sm gap-2 px-4 py-4 aspect-square">
        {item.rendered}
      </div>
    </li>
  );
};

export default SidebarMenuItem;
