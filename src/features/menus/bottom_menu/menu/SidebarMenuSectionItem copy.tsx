import { type MenuItemProps } from "@headlessui/react";
import { type Ref } from "react";
import Shape from "../../shapes/Shape";
import { shapeMap } from "../../shapes/shapeMap";
import { MenuItem } from "react-aria-components";
import { Item } from "react-stately";

interface SidebarMenuSectionItemProps extends MenuItemProps {
  title: string;
  icon?: string;
  type: string;
  ref?: Ref<HTMLDivElement>;
}

const SidebarMenuSectionItem = ({
  title,
  type,
}: SidebarMenuSectionItemProps) => {
  const DEMOShape = shapeMap[type];
  if (!DEMOShape) return null;
  return (
    <>
      <Item></Item>
    </>
  );
};

export default SidebarMenuSectionItem;
