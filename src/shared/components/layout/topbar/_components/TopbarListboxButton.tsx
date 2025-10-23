import { cn } from "@sglara/cn";
import { VisuallyHidden } from "react-aria";
import {
  Button,
  Label,
  ListBox,
  Popover,
  Select,
  SelectValue,
  type SelectProps,
} from "react-aria-components";

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, "children"> {
  label?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

const TopbarListboxButton = <T extends object>({
  label,
  items,
  children,
  ...restProps
}: MySelectProps<T>) => {
  return (
    <Select {...restProps}>
      <VisuallyHidden>
        <Label>Select language</Label>
      </VisuallyHidden>
      <Button
        className={cn(
          "text-slate-900 text-sm font-medium leading-none px-2.5 h-[1.875rem] content-center hover:bg-slate-100 data-[pressed]:bg-slate-200 transition-colors cursor-default outline-hidden focus-visible:bg-slate-100 rounded-sm"
        )}
      >
        <SelectValue defaultValue="English" />
      </Button>
      <Popover
        className={cn(
          "outline-hidden p-1 w-45 overflow-auto rounded-md bg-white shadow-xs border-1 border-slate-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left"
        )}
        placement="bottom right"
      >
        <ListBox className="flex flex-col outline-hidden" items={items}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
};

export default TopbarListboxButton;
