import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import useSwapConnection from "../../hooks/useSwapConnection";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { getEdge } from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import { takeSnapshot } from "$/features/actions/undo/useUndoRedoStore";

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
        takeSnapshot();
      }}
    />
  );
};

export default SwapConnectionControl;
