import { IconContext } from "@phosphor-icons/react";
import {
  Menu,
  Popover,
  type MenuItemProps,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

type ToolbarMenuProps<T> = MenuProps<T>;

const ToolbarMenu = <T extends object>({
  ...restProps
}: ToolbarMenuProps<T>) => {
  return (
    <div className="menu-wrapper | bg-white shadow-sm w-[12rem] border-1 border-slate-100 py-1 rounded-md">
      <IconContext value={{ size: 16, color: "var(--color-slate-900)" }}>
        <Menu {...restProps} className="flex flex-col outline-hidden" />
      </IconContext>
    </div>
  );
};

export default ToolbarMenu;
