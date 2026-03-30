import {
  getNode,
  updateNodeHandlesVisibility,
} from "$/features/modeler/store/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";

const ToggleHandlesVisibilityControl = ({
  nodeId,
}: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node || !("handles" in node.data)) return null;
  const isVisible = node.data?.handles?.isVisible;
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
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleHandlesVisibilityControl;
