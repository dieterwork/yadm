import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { Button, type ButtonProps } from "react-aria-components";

type SidebarMenuButtonProps = ButtonProps & {
  label?: string;
  isOpen?: boolean;
};

const SidebarMenuButton = ({
  label,
  isOpen,
  ...restProps
}: SidebarMenuButtonProps) => {
  return (
    <Button
      {...restProps}
      className="outline-hidden flex justify-between items-center gap-2 h-[3rem] font-medium text-sm w-full"
    >
      {label}
      <CaretDownIcon
        size={12}
        color="var(--color-slate-500)"
        className={cn(
          isOpen ? "-rotate-180" : "rotate-0",
          "transition ease-linear duration-150"
        )}
      />
    </Button>
  );
};

export default SidebarMenuButton;
