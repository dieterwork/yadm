import { Button, type ButtonProps } from "react-aria-components";
import DEMOToolbarButtonClasses from "./DEMOModelerToolbarButtonClasses";
import type { CSSProperties } from "react";

const DEMOModelerToolbarButton = ({
  width,
  isActive,
  ...restProps
}: ButtonProps & {
  width?: CSSProperties["width"];
  isActive?: boolean;
}) => {
  return (
    <Button
      {...restProps}
      className={({ isHovered, isPressed, isDisabled }) =>
        DEMOToolbarButtonClasses(isHovered, isPressed, isActive, isDisabled)
      }
      style={{ width }}
    />
  );
};

export default DEMOModelerToolbarButton;
