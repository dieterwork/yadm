import { MenuSection, type MenuSectionProps } from "react-aria-components";

const ToolbarMenuSection = <T extends object>({
  ...restProps
}: MenuSectionProps<T>) => {
  return <MenuSection {...restProps} className="flex flex-col" />;
};

export default ToolbarMenuSection;
