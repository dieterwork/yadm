import { cn } from "@sglara/cn";
import { MenuItem, type MenuItemProps } from "react-aria-components";

const DEMOMenuItem = ({
  autoWidth,
  ...restProps
}: Omit<MenuItemProps, "className"> & { autoWidth?: boolean }) => {
  return (
    <MenuItem
      {...restProps}
      className={({ isHovered, isPressed }) =>
        cn(
          "transition-colors cursor-pointer select-none outline-none text-slate-900 h-8 grid place-items-center rounded-md font-semibold text-sm",
          isHovered ? "bg-slate-100" : "bg-slate-50",
          isPressed && "bg-slate-200",
          autoWidth ? "w-auto px-2" : "w-8"
        )
      }
    />
  );
};

export default DEMOMenuItem;
