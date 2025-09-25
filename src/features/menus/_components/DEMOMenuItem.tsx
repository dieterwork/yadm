import { cn } from "@sglara/cn";
import { MenuItem, type MenuItemProps } from "react-aria-components";

const DEMOMenuItem = ({
  autoWidth,
  ...restProps
}: Omit<MenuItemProps, "className"> & { autoWidth?: boolean }) => {
  return (
    <MenuItem
      {...restProps}
      className={({ isHovered }) =>
        cn(
          "cursor-pointer select-none outline-none text-slate-900 h-8 grid place-items-center rounded-md font-semibold text-sm",
          isHovered ? "bg-white" : "bg-slate-100",
          autoWidth ? "w-auto px-2" : "w-8"
        )
      }
    />
  );
};

export default DEMOMenuItem;
