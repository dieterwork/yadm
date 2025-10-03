import { cn } from "@sglara/cn";
import { Separator, type SeparatorProps } from "react-aria-components";

const DEMOModelerToolbarSeparator = ({
  orientation,
  ...restProps
}: Omit<SeparatorProps, "className">) => {
  return (
    <Separator
      {...restProps}
      className={cn(
        "bg-slate-200 border-none",
        orientation === "horizontal"
          ? "w-[1px] h-[2.5rem] mx-1"
          : "h-[1px] w-[2.5rem] my-1"
      )}
    />
  );
};

export default DEMOModelerToolbarSeparator;
