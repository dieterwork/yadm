import { IconContext } from "@phosphor-icons/react";
import { Menu, type MenuProps } from "react-aria-components";

type DEMOElementToolbarMenuProps<T> = MenuProps<T>;

const DEMOElementToolbarMenu = <T extends object>({
  ...restProps
}: DEMOElementToolbarMenuProps<T>) => {
  return (
    <div className="menu-wrapper | bg-white shadow-sm w-[12rem] border-1 border-slate-100 py-1 rounded-md">
      <IconContext value={{ size: 16, color: "var(--color-slate-900)" }}>
        <Menu {...restProps} className="flex flex-col outline-hidden" />
      </IconContext>
    </div>
  );
};

export default DEMOElementToolbarMenu;
