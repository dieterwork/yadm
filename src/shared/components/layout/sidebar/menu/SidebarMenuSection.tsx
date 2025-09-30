import {
  ListBoxSection,
  type ListBoxSectionProps,
} from "react-aria-components";

export type SidebarMenuSectionProps<T> = ListBoxSectionProps<T>;

const SidebarMenuSection = <T extends object>({
  ...restProps
}: SidebarMenuSectionProps<T>) => {
  return (
    <ListBoxSection
      {...restProps}
      className="sidebar-menu-section | outline-hidden"
    />
  );
};

export default SidebarMenuSection;
