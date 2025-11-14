import type { DEMONode } from "$/features/nodes/nodes.types";
import {
  NODE_BACKGROUND_COLOR_MAP,
  NODE_BORDER_COLOR_MAP,
  ORGANIZATION_BORDER_COLOR_MAP,
  ORGANIZATION_BACKGROUND_COLOR_MAP,
} from "../colors/colors.consts";

const DEMOElementToolbarColorSwatch = ({
  size,
  color,
  nodeType,
}: {
  size?: number | string;
  color: string;
  nodeType: DEMONode["type"];
}) => {
  const bgColor =
    nodeType === "organization"
      ? ORGANIZATION_BACKGROUND_COLOR_MAP[color]
      : NODE_BACKGROUND_COLOR_MAP[color];
  const borderColor =
    nodeType === "organization"
      ? ORGANIZATION_BORDER_COLOR_MAP[color]
      : NODE_BORDER_COLOR_MAP[color];
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

export default DEMOElementToolbarColorSwatch;
