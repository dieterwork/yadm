import { MenuSection, type MenuSectionProps } from "react-aria-components";
import useDEMOMenuContext from "./useDEMOMenuContext";
import { cn } from "@sglara/cn";

const DEMOMenuSection = <T extends object>({
  ...restProps
}: MenuSectionProps<T>) => {
  const context = useDEMOMenuContext();
  return (
    <MenuSection
      {...restProps}
      className={cn(
        "flex",
        context.direction === "horizontal"
          ? "flex-row py-1 gap-1"
          : "flex-col px-1"
      )}
    />
  );
};

export default DEMOMenuSection;
