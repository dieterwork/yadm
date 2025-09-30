import { cn } from "@sglara/cn";
import { ListBox, type ListBoxProps } from "react-aria-components";

const SidebarMenu = <T extends object>({
  isOpen,
  ...restProps
}: ListBoxProps<T> & { isOpen?: boolean }) => {
  return (
    <div
      data-state={isOpen ? "open" : isOpen === false ? "closed" : undefined}
      className={cn(
        "sidebar-menu-wrapper",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        "grid transition-all duration-300 ease-out h-full"
      )}
    >
      <ListBox
        {...restProps}
        className={cn(
          "sidebar-menu | flex flex-col overflow-hidden flex-col gap-6 mt-2 mb-8"
        )}
      />
    </div>
  );
};

export default SidebarMenu;
