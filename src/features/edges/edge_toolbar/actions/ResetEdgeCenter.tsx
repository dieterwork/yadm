import { ClockClockwiseIcon } from "@phosphor-icons/react";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import { takeSnapshot } from "$/features/actions/undo/useUndoRedoStore";

const ResetEdgeCenter = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const edge = getEdge(edgeId);
  if (!edge) return null;
  const { t } = useTranslation();

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <ClockClockwiseIcon {...iconProps} />}
      label={t(($) => $["Reset edge center"])}
      onPress={() => {
        updateEdgeData(edgeId, { center: undefined });
        takeSnapshot();
      }}
    />
  );
};

export default ResetEdgeCenter;
