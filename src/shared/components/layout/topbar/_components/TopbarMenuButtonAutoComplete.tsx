import MenuSearchField from "$/shared/components/ui/search/SearchField";
import { cn } from "@sglara/cn";
import {
  Autocomplete,
  Button,
  Menu,
  MenuTrigger,
  Popover,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

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
          onInputChange={onSearchValueChange}
          inputValue={searchValue}
        >
          <MenuSearchField label={searchLabel} />
          <Menu
            {...restProps}
            className="outline-hidden"
            renderEmptyState={() => "No results found."}
          >
            {children}
          </Menu>
        </Autocomplete>
      </Popover>
    </MenuTrigger>
  );
};

export default TopbarMenuButtonAutoComplete;
