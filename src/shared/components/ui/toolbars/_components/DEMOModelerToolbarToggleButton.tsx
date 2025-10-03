import { ToggleButton, type ToggleButtonProps } from "react-aria-components";
import DEMOToolbarButtonClasses from "./DEMOModelerToolbarButtonClasses";
import type { CSSProperties } from "react";

const DEMOModelerToolbarToggleButton = ({
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
      className={({ isHovered, isPressed }) =>
        DEMOToolbarButtonClasses(isHovered, isPressed, isActive)
      }
      style={{ width }}
    />
  );
};

export default DEMOModelerToolbarToggleButton;
