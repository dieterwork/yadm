import { cn } from "@sglara/cn";
import { Separator, type SeparatorProps } from "react-aria-components";
import useDEMOMenuContext from "./useDEMOMenuContext";

const DEMOMenuSeparator = ({
  ...restProps
}: Omit<SeparatorProps, "className">) => {
  const context = useDEMOMenuContext();
  return (
    <Separator
      {...restProps}
      className={cn(
        "bg-slate-200",
        context.direction === "horizontal"
          ? "w-[1px] h-[calc(var(--spacing) * 8)] mx-1"
          : "h-[1px] w-[calc(var(--spacing) * 8)] my-1"
      )}
    />
  );
};

export default DEMOMenuSeparator;
