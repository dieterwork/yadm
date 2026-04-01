import {
  ColorSwatch as AriaColorSwatch,
  type ColorSwatchProps,
} from "react-aria-components";
import { cn } from "tailwind-variants";

export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <AriaColorSwatch
      {...props}
      className={cn(
        props.className,
        "w-8 h-8 box-border rounded-md border border-black/10"
      )}
      style={({ color }) => ({
        background: `linear-gradient(${color}, ${color}),
          repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
      })}
    />
  );
}
