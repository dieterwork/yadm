import { IconContext } from "@phosphor-icons/react";
import { Toolbar, type ToolbarProps } from "react-aria-components";

type DEMOElementToolbarProps = ToolbarProps;

const DEMOElementToolbar = ({ ...restProps }: DEMOElementToolbarProps) => {
  return (
    <div className="menu-wrapper | bg-white shadow-sm w-[12rem] border-1 border-slate-100 py-1 rounded-md">
      <IconContext value={{ size: 16, color: "var(--color-slate-900)" }}>
        <Toolbar {...restProps} className="flex flex-col outline-hidden" />
      </IconContext>
    </div>
  );
};

export default DEMOElementToolbar;
