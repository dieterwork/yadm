import React from "react";
import {
  ColorPicker as AriaColorPicker,
  type ColorPickerProps as AriaColorPickerProps,
  DialogTrigger,
  Popover,
  Dialog,
} from "react-aria-components";
import { ColorArea } from "./ColorArea";
import ColorSlider from "./ColorSlider";
import ColorField from "./ColorField";
import ColorSwatchButton from "./ColorSwatchToolbarButton";
import type { Placement } from "react-aria";
import ColorPickerPopover from "./ColorPickerPopover";

export interface ColorPickerProps extends Omit<
  AriaColorPickerProps,
  "children"
> {
  label?: string;
  children?: React.ReactNode;
  popoverPlacement?: Placement;
}

function DEMOToolbarColorPicker({
  label,
  children,
  popoverPlacement,
  ...props
}: ColorPickerProps) {
  return (
    <AriaColorPicker {...props}>
      <DialogTrigger>
        <ColorSwatchButton color={props.value} />
        <ColorPickerPopover>{children}</ColorPickerPopover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}

export default DEMOToolbarColorPicker;
