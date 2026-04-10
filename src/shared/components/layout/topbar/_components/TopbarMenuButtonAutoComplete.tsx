import MenuSearchField from "$/shared/components/ui/search/SearchField";
import { cn } from "@sglara/cn";
import {
  Autocomplete,
  Button,
  Menu,
  MenuTrigger,
  Popover,
  useFilter,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";
import type {Filter} from "react-aria";

type TopbarMenuButtonProps<T> = MenuProps<T> &
  Omit<MenuTriggerProps, "children"> & {
    label?: string;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    searchLabel?: string;
    size?: "small" | "medium" | "large";
  };

const TopbarMenuButtonAutoComplete = <T extends object>({
  label,
  children,
  searchValue,
  onSearchValueChange,
  searchLabel,
  size = "medium",
  ...restProps
}: TopbarMenuButtonProps<T>) => {

    const modelFilter = (textValue: string, inputValue: string): boolean => {

        const trimmedInputValue = inputValue?.trim()?.toLowerCase() ?? '';

        if(trimmedInputValue === '') return true;

        return textValue.toLowerCase().includes(trimmedInputValue);

    }

  return (
    <MenuTrigger {...restProps}>
      <Button
        className={cn(
          "text-slate-900 text-sm font-medium leading-none px-2.5 h-[1.875rem] content-center hover:bg-slate-100 data-[pressed]:bg-slate-200 transition-colors cursor-default outline-hidden focus-visible:bg-slate-100 rounded-sm"
        )}
      >
        {label}
      </Button>
      <Popover
        className={cn(
          size === "small" && "w-35",
          size === "medium" && "w-45",
          size === "large" && "w-55",
          "outline-hidden p-1 overflow-auto rounded-md bg-white shadow-xs border-1 border-slate-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left"
        )}
      >
        <Autocomplete
          {...restProps}
          onInputChange={onSearchValueChange}
          inputValue={searchValue}
          filter={modelFilter}
        >
          <MenuSearchField label={searchLabel} />
          <Menu
            {...restProps}
            className="outline-hidden"
            renderEmptyState={() => (
              <div className="px-2 h-[2rem] content-center">
                <p className="text-sm text-slate-900">No results found</p>
              </div>
            )}
          >
            {children}
          </Menu>
        </Autocomplete>
      </Popover>
    </MenuTrigger>
  );
};

export default TopbarMenuButtonAutoComplete;
