import {
  getNode,
  updateNodeHandlesVisibility,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";

const ToggleHandlesVisibilityControl = ({
  nodeId,
}: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node) return null;
  const isVisible = node.data?.handles.isVisible;
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isVisible ? EyeIcon : EyeClosedIcon;
        return <Icon {...iconProps} />;
      }}
      label={isVisible ? "Hide handles" : "Show handles"}
      isSelected={isVisible}
      onChange={(isVisible) => {
        updateNodeHandlesVisibility(nodeId, isVisible);
      }}
    />
  );
};

export default ToggleHandlesVisibilityControl;
