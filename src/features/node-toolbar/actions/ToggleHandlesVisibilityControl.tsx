import {
  getNode,
  updateNodeHandlesVisibility,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";

const ToggleHandlesVisibilityControl = ({
  nodeId,
}: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node) return null;
  const isVisible = node.data?.handles.isVisible;
  const { t } = useTranslation();
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isVisible ? EyeIcon : EyeClosedIcon;
        return <Icon {...iconProps} />;
      }}
      label={
        isVisible ? t(($) => $["Hide handles"]) : t(($) => $["Show handles"])
      }
      isSelected={isVisible}
      onChange={(isVisible) => {
        updateNodeHandlesVisibility(nodeId, isVisible);
      }}
    />
  );
};

export default ToggleHandlesVisibilityControl;
