import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  updateEdgeData,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { useState } from "react";
import type { MarkerType } from "@xyflow/react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";

const ToggleMarkerMidControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const [markerMid] = useState<MarkerType | undefined>(() => {
    const edge = getEdge(edgeId);
    if (!edge?.data || !("markerMid" in edge.data)) return undefined;
    return edge.data?.markerMid;
  });

  const edge = getEdge(edgeId);
  if (!edge) return null;
  const label = t(
    ($) =>
      $[
        edge?.data && "markerMid" in edge.data && edge.data.markerMid
          ? "Hide marker"
          : "Show marker"
      ],
  );

  return (
    <DEMOElementToolbarButton
      icon={(props) =>
        edge.data && "markerMid" in edge.data && edge.data.markerMid ? (
          <EyeIcon {...props} />
        ) : (
          <EyeClosedIcon {...props} />
        )
      }
      label={label}
      onPress={() => {
        updateEdgeData(edgeId, {
          markerMid:
            edge.data && "markerMid" in edge.data && edge.data.markerMid
              ? undefined
              : markerMid,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerMidControl;
