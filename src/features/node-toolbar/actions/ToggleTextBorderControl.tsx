import {
  getNode,
  updateNodeBorderVisibility,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import { takeSnapshot } from "$/features/actions/undo/useUndoRedoStore";

const ToggleTextBorderControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node || !("isBorderVisible" in node.data)) return null;
  const isBorderVisible = node.data?.isBorderVisible;
  const { t } = useTranslation();
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isBorderVisible ? EyeIcon : EyeClosedIcon;
        return <Icon {...iconProps} />;
      }}
      label={
        isBorderVisible
          ? t(($) => $["Hide border"])
          : t(($) => $["Show border"])
      }
      isSelected={isBorderVisible}
      onChange={(isVisible) => {
        updateNodeBorderVisibility(nodeId, isVisible);
        takeSnapshot();
      }}
    />
  );
};

export default ToggleTextBorderControl;
