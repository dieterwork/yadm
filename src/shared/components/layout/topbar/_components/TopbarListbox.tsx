import { ListBox, type ListBoxProps } from "react-aria-components";

type TopbarListboxProps<T> = ListBoxProps<T>;

const TopbarListbox = <T extends object>({
  ...restProps
}: TopbarListboxProps<T>) => {
  return (
    <div className="menu-wrapper | bg-white shadow-sm w-[12rem] border-1 border-slate-100 py-1 rounded-md">
      <ListBox
        {...restProps}
        className="flex flex-col outline-hidden"
        selectionBehavior="replace"
        disallowEmptySelection
      />
    </div>
  );
};

export default TopbarListbox;
