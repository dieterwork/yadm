import React from "react";
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  DialogTrigger,
  type PopoverProps,
} from "react-aria-components";
import type { AriaPopoverProps, Placement } from "react-aria";
import ColorPickerPopover from "./ColorPickerPopover";
import DEMOElementToolbarButton from "../element_toolbar/DEMOElementToolbarButton";
import { PaintBrushHouseholdIcon } from "@phosphor-icons/react";

export interface ColorPickerProps extends Omit<
  AriaColorPickerProps,
  "children"
> {
  label?: string;
  children?: React.ReactNode;
  popoverProps?: PopoverProps;
}

function DEMOElementToolbarColorPicker({
  label,
  children,
  popoverProps,
  ...props
}: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <DEMOElementToolbarButton
          label={label}
          icon={(iconProps) => <PaintBrushHouseholdIcon {...iconProps} />}
          menuTrigger
        />
        <ColorPickerPopover popoverProps={popoverProps}>
          {children}
        </ColorPickerPopover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}

export default DEMOElementToolbarColorPicker;
