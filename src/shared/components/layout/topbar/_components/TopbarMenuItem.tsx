import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { MenuItem, type MenuItemProps } from "react-aria-components";

const TopbarMenuItem = ({
  textValue,
  children,
  ...restProps
}: Omit<MenuItemProps, "children"> & { children?: React.ReactNode }) => {
  return (
    <MenuItem
      {...restProps}
      className={({ isFocused, isSelected, isOpen }) =>
        cn(
          isOpen ? "bg-slate-100" : "bg-white",
          "flex justify-between items-center text-slate-900 text-sm leading-none px-2 h-[2rem] hover:bg-slate-100 data-[pressed]:bg-slate-200 transition-colors cursor-default outline-hidden rounded-sm"
        )
      }
    >
      {({ isDisabled, hasSubmenu }) => (
        <span className={cn(isDisabled && "opacity-50")}>
          {children}
          {hasSubmenu && <CaretRightIcon size={14} />}
        </span>
      )}
    </MenuItem>
  );
};

export default TopbarMenuItem;
