import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  Button,
  Input,
  Label,
  VisuallyHidden,
} from "react-aria-components";

export interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  placeholder?: string;
}

const MenuSearchField = ({
  label,
  placeholder,
  ...props
}: SearchFieldProps) => {
  return (
    <AriaSearchField
      {...props}
      className={cn(
        props.className,
        "grid content-center px-2 h-[2.5rem] text-sm group"
      )}
    >
      {label && (
        <VisuallyHidden>
          <Label>{label}</Label>
        </VisuallyHidden>
      )}
      <div className="relative grid grid-cols-[auto_1fr_auto] items-center">
        <MagnifyingGlassIcon
          aria-hidden
          className="text-slate-500 mr-1"
          size={18}
        />
        <Input
          placeholder={placeholder}
          className="pl-1 pr-4.5 [&::-webkit-search-cancel-button]:hidden w-full border-1 border-slate-300 rounded-sm"
        />
        <Button className="block content-center absolute right-1 cursor-pointer group-empty:invisible">
          <XIcon aria-hidden size={12} />
        </Button>
      </div>
    </AriaSearchField>
  );
};

export default MenuSearchField;
