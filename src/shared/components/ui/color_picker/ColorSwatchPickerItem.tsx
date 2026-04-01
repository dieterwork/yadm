import {
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorSwatch } from "./ColorSwatch";

const itemStyles = tv({
  base: "relative rounded-xs [-webkit-tap-highlight-color:transparent]",
});

function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props} className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 w-full h-full box-border border border-2 border-black dark:border-white outline outline-2 outline-white dark:outline-black -outline-offset-4 rounded-md forced-color-adjust-none" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  );
}

export default ColorSwatchPickerItem;
