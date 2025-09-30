import type { NodeColor } from "../colors/colors.types";
import {
  NODE_BACKGROUND_COLOR_MAP,
  NODE_BORDER_COLOR_MAP,
} from "../colors/colors.consts";

const ToolbarColorSwatch = ({
  size,
  color,
}: {
  size?: number | string;
  color: NodeColor;
}) => {
  const bgColor = NODE_BACKGROUND_COLOR_MAP[color];
  const borderColor = NODE_BORDER_COLOR_MAP[color];
  return (
    <div
      color={color}
      className="rounded-sm border-2"
      style={{
        backgroundColor: bgColor,
        borderColor,
        width: size,
        height: size,
      }}
    />
  );
};

export default ToolbarColorSwatch;
