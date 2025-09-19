import { cn } from "@sglara/cn";
import { MenuItem, type MenuItemProps } from "react-aria-components";

interface SidebarMenuSectionItemProps extends MenuItemProps {
  label?: string;
  icon?: string;
  isActive?: boolean;
}

const SidebarMenuSectionItem = ({
  isActive,
  label,
  icon,
  ...restProps
}: SidebarMenuSectionItemProps) => {
  return (
    <MenuItem
      {...restProps}
      className={cn(
        "sidebar-menu-section-item",
        isActive ? "bg-blue-500" : "bg-white",
        "outline-hidden hover:bg-slate-100 flex items-center border-1 border-slate-200 px-4 py-4 not-first:mt-2 rounded-md"
      )}
    >
      <div className="icon | h-[32px] aspect-square">
        <img src={icon} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="label | font-medium text-center text-xs ml-2.5">
        {label}
      </div>
    </MenuItem>
  );
};

export default SidebarMenuSectionItem;
