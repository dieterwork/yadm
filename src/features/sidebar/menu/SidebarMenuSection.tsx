import {
  Header,
  MenuSection,
  type MenuSectionProps,
} from "react-aria-components";

type SidebarMenuSectionProps<T> = MenuSectionProps<T>;
const SidebarMenuSection = <T extends object>({
  children,
  label,
  ...restProps
}: SidebarMenuSectionProps<T> & { label?: string }) => {
  return (
    <MenuSection {...restProps} className="sidebar-menu-section">
      {children}
    </MenuSection>
  );
};

export default SidebarMenuSection;
