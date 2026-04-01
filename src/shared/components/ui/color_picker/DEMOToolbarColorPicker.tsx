import React from "react";
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  DialogTrigger,
  type PopoverProps,
} from "react-aria-components";
import ColorSwatchButton from "./ColorSwatchToolbarButton";
import ColorPickerPopover from "./ColorPickerPopover";

export interface ColorPickerProps extends Omit<
  AriaColorPickerProps,
  "children"
> {
  label?: string;
  children?: React.ReactNode;
  popoverProps?: PopoverProps;
}

function DEMOToolbarColorPicker({
  label,
  children,
  popoverProps,
  ...props
}: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <ColorSwatchButton color={props.value} />
        <ColorPickerPopover popoverProps={popoverProps}>
          {children}
        </ColorPickerPopover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}

export default DEMOToolbarColorPicker;
