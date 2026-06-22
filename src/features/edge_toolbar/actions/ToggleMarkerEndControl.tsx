import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  getNode,
  updateEdge,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const ToggleMarkerEndControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();

  const edge = getEdge(edgeId);
  if (!edge) return null;

  const sourceNode = getNode(edge.source);
  const targetNode = getNode(edge.target);
  const markerType = getMarkerType(
    sourceNode?.type,
    targetNode?.type,
    "default",
  );

  const label = t(($) => $[edge.markerEnd ? "Hide marker" : "Show marker"]);

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) =>
        edge.markerEnd ? (
          <EyeIcon {...iconProps} />
        ) : (
          <EyeClosedIcon {...iconProps} />
        )
      }
      label={label}
      onPress={() => {
        updateEdge(edgeId, {
          markerEnd: edge.markerEnd ? undefined : markerType.markerEnd,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerEndControl;
