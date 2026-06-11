import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  updateEdge,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { useEffect, useState } from "react";
import type { EdgeMarkerType } from "@xyflow/react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";

const ToggleMarkerEndControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const [markerEnd] = useState<EdgeMarkerType | undefined>(() => {
    const edge = getEdge(edgeId);
    return edge?.markerEnd;
  });

  const edge = getEdge(edgeId);
  if (!edge) return null;

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
          markerEnd: edge.markerEnd ? undefined : markerEnd,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerEndControl;
