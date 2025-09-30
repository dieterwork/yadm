import type { SeparatorProps } from "react-aria";
import { Separator } from "react-aria-components";

const ToolbarMenuSeparator = ({ ...restProps }: SeparatorProps) => {
  return (
    <Separator {...restProps} className="w-full h-[1px] bg-slate-100 my-1" />
  );
};

export default ToolbarMenuSeparator;
