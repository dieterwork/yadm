import { IconContext } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { Toolbar, type ToolbarProps } from "react-aria-components";

const DEMOModelerToolbar = ({ orientation, ...restProps }: ToolbarProps) => {
  return (
    <div
      className={cn(
        "demo-modeler-toolbar-wrapper | bg-slate-50 rounded-md shadow-sm"
      )}
    >
      <IconContext value={{ size: 20, color: "var(--color-slate-900)" }}>
        <Toolbar
          {...restProps}
          className={cn(
            restProps.className,
            "flex",
            orientation === "horizontal"
              ? "flex-row px-1 h-[2.5rem]"
              : "flex-col py-1 w-[2.5rem]"
          )}
        />
      </IconContext>
    </div>
  );
};

export default DEMOModelerToolbar;
