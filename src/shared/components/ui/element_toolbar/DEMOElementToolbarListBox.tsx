import { IconContext } from "@phosphor-icons/react";
import { ListBox, type ListBoxProps } from "react-aria-components";

type DEMOElementToolbarListBoxProps<T> = ListBoxProps<T>;

const DEMOElementToolbarListBox = <T extends object>({
  ...restProps
}: DEMOElementToolbarListBoxProps<T>) => {
  return (
    <div className="menu-wrapper | bg-white shadow-sm w-[12rem] border-1 border-slate-100 py-1 rounded-md">
      <IconContext value={{ size: 16, color: "var(--color-slate-900)" }}>
        <ListBox {...restProps} className="flex flex-col outline-hidden" />
      </IconContext>
    </div>
  );
};

export default DEMOElementToolbarListBox;
