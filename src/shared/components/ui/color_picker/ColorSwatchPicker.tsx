import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  type ColorSwatchPickerProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const pickerStyles = tv({
  base: "flex gap-1",
  variants: {
    layout: {
      stack: "flex-col",
      grid: "flex-wrap",
    },
  },
});

function ColorSwatchPicker({
  children,
  ...props
}: Omit<ColorSwatchPickerProps, "layout">) {
  return (
    <AriaColorSwatchPicker
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        pickerStyles({ ...renderProps, className })
      )}
    >
      {children}
    </AriaColorSwatchPicker>
  );
}

export default ColorSwatchPicker;
