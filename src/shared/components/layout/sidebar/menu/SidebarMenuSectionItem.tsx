import { cn } from "@sglara/cn";
import {
  ListBoxItem,
  MenuItem,
  type ListBoxItemProps,
  type MenuItemProps,
} from "react-aria-components";

interface SidebarMenuSectionItemProps extends ListBoxItemProps {
  label?: string;
  icon?: string;
}

const SidebarMenuSectionItem = ({
  label,
  icon,
  ...restProps
}: SidebarMenuSectionItemProps) => {
  return (
    <ListBoxItem
      {...restProps}
      textValue={label}
      className={({ isSelected }) =>
        cn(
          "sidebar-menu-section-item",
          isSelected
            ? "border-sky-500 bg-sky-500 text-white"
            : "hover:bg-slate-100 border-slate-200 text-slate-900 bg-white",
          "outline-hidden flex items-center border-1 px-4 py-4 not-first:mt-2 rounded-md"
        )
      }
    >
      <div className="icon | h-[32px] aspect-square">
        <img src={icon} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="label | font-medium text-center text-xs ml-2.5">
        {label}
      </div>
    </ListBoxItem>
  );
};

export default SidebarMenuSectionItem;
