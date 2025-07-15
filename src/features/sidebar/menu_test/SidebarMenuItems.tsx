import { MenuItems, type MenuItemsProps } from "@headlessui/react";

interface SidebarMenuItemsProps extends MenuItemsProps {}

const SidebarMenuItems = ({ ...restProps }: SidebarMenuItemsProps) => {
  return (
    <>
      <MenuItems {...restProps} />
    </>
  );
};

export default SidebarMenuItems;
