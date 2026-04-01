import { type ColorSwatchProps } from "react-aria-components";
import DEMOModelerToolbarButton from "../toolbars/_components/DEMOModelerToolbarButton";
import { PaintBucketIcon } from "@phosphor-icons/react";
import { useColorSwatch } from "react-aria";

function ColorSwatchButton(props: ColorSwatchProps) {
  const { colorSwatchProps, color } = useColorSwatch(props);
  return (
    <DEMOModelerToolbarButton>
      <div {...colorSwatchProps} style={{}}>
        <PaintBucketIcon
          weight="duotone"
          color="var(--color-slate-900)"
          style={{ "--_fill-color": color.toString("hex") }}
          className="[&>[opacity='0.2']]:opacity-100 [&>[opacity='0.2']]:fill-(--_fill-color)"
        />
      </div>
    </DEMOModelerToolbarButton>
  );
}

export default ColorSwatchButton;
