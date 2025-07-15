import { MenuButton, type MenuButtonProps } from "@headlessui/react";
import { CaretDownIcon } from "@phosphor-icons/react";

interface SidebarMenuButtonProps extends MenuButtonProps {
  label: string;
  icon?: string;
}

const SidebarMenuButton = ({
  label,
  icon,
  ...restProps
}: SidebarMenuButtonProps) => {
  return (
    <>
      <MenuButton
        className="flex items-center gap-2 px-4 py-4 font-medium text-sm w-[264px]"
        {...restProps}
      >
        <div className="bg-red-500 w-7 aspect-square"></div>
        {label}
        <CaretDownIcon size={12} className="ml-auto" />
      </MenuButton>
    </>
  );
};

export default SidebarMenuButton;
