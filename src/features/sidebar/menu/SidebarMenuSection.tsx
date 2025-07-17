import {
  MenuHeading,
  MenuSection,
  type MenuSectionProps,
} from "@headlessui/react";

interface SidebarMenuSectionProps extends MenuSectionProps {
  title: string;
}

const SidebarMenuSection = ({
  title,
  children,
  ...restProps
}: SidebarMenuSectionProps) => {
  return (
    <>
      <MenuSection {...restProps} className="grid grid-cols-2 gap-4">
        <MenuHeading className={`${!title ? "visually-hidden" : ""}`}>
          {title}
        </MenuHeading>
      </MenuSection>
    </>
  );
};
export default SidebarMenuSection;
