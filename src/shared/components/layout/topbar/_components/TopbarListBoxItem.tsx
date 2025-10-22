import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";

type TopbarListboxItemProps = ListBoxItemProps & {
  label?: string;
};

const TopbarListboxItem = ({ label, ...restProps }: TopbarListboxItemProps) => {
  return (
    <ListBoxItem
      {...restProps}
      className={({ isSelected, isDisabled }) =>
        cn(
          "outline-hidden nodrag nopan cursor-pointer select-none flex items-center justify-between text-slate-900 text-xs leading-none mx-1 px-2 h-[2rem] rounded-md",
          isSelected ? "bg-sky-100" : "hover:bg-slate-100 bg-white",
          isDisabled ? "opacity-30" : "opacity-100"
        )
      }
    >
      {({ isSelected }) => (
        <>
          <span
            className={cn(
              isSelected ? "text-sky-900" : "text-slate-900",
              "font-medium"
            )}
          >
            {label}
          </span>
          {isSelected && <CheckIcon color="var(--color-sky-900)" size={16} />}
        </>
      )}
    </ListBoxItem>
  );
};

export default TopbarListboxItem;
