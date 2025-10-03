import {
  getNode,
  updateNodeBorderVisibility,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";

const ToggleTextBorderControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node) return null;
  const isBorderVisible = node.data?.isBorderVisible;
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isBorderVisible ? EyeIcon : EyeClosedIcon;
        return <Icon {...iconProps} />;
      }}
      label={isBorderVisible ? "Hide border" : "Show border"}
      isSelected={isBorderVisible}
      onChange={(isVisible) => {
        updateNodeBorderVisibility(nodeId, isVisible);
      }}
    />
  );
};

export default ToggleTextBorderControl;
