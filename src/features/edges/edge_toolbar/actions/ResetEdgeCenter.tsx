import { ArrowsLeftRightIcon, ClockClockwiseIcon } from "@phosphor-icons/react";
import useSwapConnection from "../../hooks/useSwapConnection";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

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
      }}
    />
  );
};

export default ResetEdgeCenter;
