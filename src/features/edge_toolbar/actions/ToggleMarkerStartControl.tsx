import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  updateEdge,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { useState } from "react";
import type { EdgeMarkerType } from "@xyflow/react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";

const ToggleMarkerStartControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const [markerStart] = useState<EdgeMarkerType | undefined>(() => {
    const edge = getEdge(edgeId);
    return edge?.markerStart;
  });

  const edge = getEdge(edgeId);
  if (!edge) return null;
  const label = t(($) => $[edge.markerStart ? "Hide marker" : "Show marker"]);

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
          markerStart: edge.markerStart ? undefined : markerStart,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerStartControl;
