import type { SeparatorProps } from "react-aria";
import { Separator } from "react-aria-components";

const DEMOElementToolbarSeparator = ({ ...restProps }: SeparatorProps) => {
  return (
    <Separator
      {...restProps}
      className="w-full h-[1px] bg-slate-100 my-1 border-none"
    />
  );
};

export default DEMOElementToolbarSeparator;
