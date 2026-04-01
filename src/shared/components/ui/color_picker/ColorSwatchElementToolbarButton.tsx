import { type ColorSwatchProps } from "react-aria-components";
import DEMOModelerToolbarButton from "../toolbars/_components/DEMOModelerToolbarButton";
import { PaintBucketIcon } from "@phosphor-icons/react";
import { useColorSwatch } from "react-aria";
import DEMOElementToolbarButton from "../element_toolbar/DEMOElementToolbarButton";

function ColorSwatchButton(props: ColorSwatchProps) {
  const { colorSwatchProps, color } = useColorSwatch(props);
  return (
    <DEMOElementToolbarButton
      label={t(($) => $["Color"])}
      icon={(iconProps) => <PaintBrushHouseholdIcon {...iconProps} />}
      menuTrigger
      id={id}
    />
  );
}

export default ColorSwatchButton;
