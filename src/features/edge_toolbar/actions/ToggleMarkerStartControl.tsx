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

const ToggleMarkerStartControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();

  const edge = getEdge(edgeId);
  if (!edge) return null;
  const label = t(($) => $[edge.markerStart ? "Hide marker" : "Show marker"]);
  const sourceNode = getNode(edge.source);
  const targetNode = getNode(edge.target);
  const markerType = getMarkerType(
    sourceNode?.type,
    targetNode?.type,
    "default",
  );

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) =>
        edge.markerStart ? (
          <EyeIcon {...iconProps} />
        ) : (
          <EyeClosedIcon {...iconProps} />
        )
      }
      label={label}
      onPress={() => {
        updateEdge(edgeId, {
          markerStart: edge.markerStart ? undefined : markerType.markerStart,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerStartControl;
