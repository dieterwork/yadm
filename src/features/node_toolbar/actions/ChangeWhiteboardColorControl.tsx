import {
  getNode,
  updateNodeColor,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useEffect, useId, useState } from "react";
import {
  MenuTrigger,
  parseColor,
  Popover,
  type Color,
  type Selection,
} from "react-aria-components";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import DEMOElementToolbarColorPicker from "$/shared/components/ui/color_picker/DEMOElementToolbarColorPicker";
import takeWhiteboardSnapshotAndSave from "$/features/whiteboard/utils/takeWhiteboardSnapshotAndSave";

const ChangeWhiteboardColorControl = ({
  nodeId,
}: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node) return null;

  const label = t(($) => $["Color"]);

  const [color, setColor] = useState<Color>(() =>
    "color" in node.data && node.data.color
      ? parseColor(node.data.color)
      : parseColor("#000"),
  );

  return (
    <MenuTrigger>
      <DEMOElementToolbarColorPicker
        label={label}
        popoverProps={{
          placement: "right top",
          shouldFlip: false,
          className: "outline-hidden",
        }}
        value={color}
        onChange={(val) => {
          setColor(val);
          updateNodeColor(nodeId, val.toString("hex"));
          takeWhiteboardSnapshotAndSave();
        }}
      />
    </MenuTrigger>
  );
};

export default ChangeWhiteboardColorControl;
