import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { ToggleButton, type ToggleButtonProps } from "react-aria-components";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
} & Omit<ToggleButtonProps, "isSelected" | "onChange">;
const SidebarToggleButton = ({ isOpen, onOpenChange, ...restProps }: Props) => {
  const Icon = isOpen ? CaretDoubleLeftIcon : CaretDoubleRightIcon;
  return (
    <ToggleButton
      isSelected={isOpen}
      onChange={onOpenChange}
      className={cn(
        "size-6 grid place-items-center rounded-full bg-sky-100 hover:bg-sky-200 cursor-pointer select-none transition-colors"
      )}
    >
      <Icon size={14} color="var(--color-sky-500)" />
    </ToggleButton>
  );
};

export default SidebarToggleButton;
