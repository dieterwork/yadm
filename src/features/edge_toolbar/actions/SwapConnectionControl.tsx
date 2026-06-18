import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { getEdge } from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import useSwapConnection from "$/features/edges/hooks/useSwapConnection";

const SwapConnectionControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const edge = getEdge(edgeId);
  if (!edge) return null;
  const { t } = useTranslation();
  const swapConnection = useSwapConnection({
    sourceNodeId: edge.source,
    targetNodeId: edge.target,
    edgeId,
  });
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <ArrowsLeftRightIcon {...iconProps} />}
      label={t(($) => $["Swap connection"])}
      onPress={() => {
        swapConnection();
        takeSnapshotAndSave();
      }}
    />
  );
};

export default SwapConnectionControl;
