import {
  ColorArea as AriaColorArea,
  type ColorAreaProps as AriaColorAreaProps,
} from "react-aria-components";
import { cn } from "@sglara/cn";
import { ColorThumb } from "./ColorThumb";

export interface ColorAreaProps extends AriaColorAreaProps {}

export function ColorArea(props: ColorAreaProps) {
  return (
    <AriaColorArea
      {...props}
      className={cn(
        props.className,
        "w-full max-w-56 aspect-square rounded-lg bg-neutral-300 dark:bg-neutral-800 forced-colors:bg-[GrayText]"
      )}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background,
      })}
    >
      <ColorThumb />
    </AriaColorArea>
  );
}
