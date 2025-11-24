import { ToggleButton, type ToggleButtonProps } from "react-aria-components";
import DEMOToolbarButtonClasses from "./DEMOModelerToolbarButtonClasses";
import type { CSSProperties } from "react";

const DEMOModelerToolbarButton = ({
  width,
  isActive,
  ...restProps
}: ToggleButtonProps & {
  width?: CSSProperties["width"];
  isActive?: boolean;
}) => {
  return (
    <ToggleButton
      {...restProps}
      className={({ isHovered, isPressed, isDisabled }) =>
        DEMOToolbarButtonClasses(isHovered, isPressed, isActive, isDisabled)
      }
      style={{ width }}
    />
  );
};

export default DEMOModelerToolbarButton;
