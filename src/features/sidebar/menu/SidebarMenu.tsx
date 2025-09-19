import type { AriaMenuProps } from "react-aria";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import { useRef } from "react";
import { cn } from "@sglara/cn";
import { Menu, type MenuProps } from "react-aria-components";

const SidebarMenu = <T extends object>({
  isOpen,
  ...restProps
}: MenuProps<T> & { isOpen?: boolean }) => {
  return (
    <div
      data-state={isOpen ? "open" : isOpen === false ? "closed" : undefined}
      className={cn(
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        "grid transition-all duration-300 ease-out"
      )}
    >
      <Menu
        {...restProps}
        className={cn(restProps.className, "flex flex-col overflow-hidden ")}
      />
    </div>
  );
};

export default SidebarMenu;
