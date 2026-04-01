import type { ReactNode } from "react";

import { ColorArea } from "./ColorArea";
import ColorSlider from "./ColorSlider";
import ColorField from "./ColorField";
import { Dialog, Popover, type PopoverProps } from "react-aria-components";

type Props = {
  children?: ReactNode;
  popoverProps?: PopoverProps;
};
const ColorPickerPopover = ({ popoverProps, children }: Props) => {
  return (
    <Popover {...popoverProps}>
      <Dialog className="flex flex-col gap-2 bg-white p-3 rounded-md border-1 border-slate-100">
        {children || (
          <>
            <ColorArea
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
            />
            <ColorSlider colorSpace="hsb" channel="hue" />
            <ColorField label="Hex" />
          </>
        )}
      </Dialog>
    </Popover>
  );
};

export default ColorPickerPopover;
