import { Menu, type MenuProps } from "react-aria-components";
import DEMOMenuContext from "./DEMOMenuContext";
import { cn } from "@sglara/cn";
import { IconContext } from "@phosphor-icons/react";

const DEMOMenu = <T extends object>({
  direction = "horizontal",
  ...restProps
}: MenuProps<T> & { direction?: "horizontal" | "vertical" }) => {
  return (
    <DEMOMenuContext value={{ direction }}>
      <IconContext value={{ size: 20, color: "var(--color-black)" }}>
        <div
          className={cn(
            "demo-menu-wrapper | bg-slate-100 flex rounded-md border-1 border-slate-300 shadow-sm",
            direction === "horizontal" ? "px-1" : "py-1"
          )}
        >
          <Menu
            {...restProps}
            className={cn(
              "flex",
              direction === "horizontal" ? "flex-row" : "flex-col"
            )}
          />
        </div>
      </IconContext>
    </DEMOMenuContext>
  );
};

export default DEMOMenu;
