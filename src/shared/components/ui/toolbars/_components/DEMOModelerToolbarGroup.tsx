import { cn } from "@sglara/cn";
import { Group, type GroupProps } from "react-aria-components";

const DEMOModelerToolbarGroup = ({ ...restProps }: GroupProps) => {
  return (
    <Group
      {...restProps}
      className={cn(
        "flex items-center gap-0.5",
        restProps["aria-orientation"] === "horizontal"
          ? "flex-row h-[2.5rem]"
          : "flex-col w-[2.5rem]"
      )}
    />
  );
};

export default DEMOModelerToolbarGroup;
