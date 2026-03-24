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

export function SearchField({
  label,
  placeholder,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className={cn(props.className)}>
      {label && (
        <VisuallyHidden>
          <Label>{label}</Label>
        </VisuallyHidden>
      )}
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        <MagnifyingGlassIcon
          aria-hidden
          className="w-4 h-4 ml-2 text-neutral-500 dark:text-neutral-400 forced-colors:text-[ButtonText] group-disabled:text-neutral-200 dark:group-disabled:text-neutral-600 forced-colors:group-disabled:text-[GrayText]"
        />
        <Input
          placeholder={placeholder}
          className="pl-2 [&::-webkit-search-cancel-button]:hidden w-full"
        />
        <Button className="mr-1 w-6 group-empty:invisible">
          <XIcon aria-hidden className="w-4 h-4" />
        </Button>
      </div>
    </AriaSearchField>
  );
}
