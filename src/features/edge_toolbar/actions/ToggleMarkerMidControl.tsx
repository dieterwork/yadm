import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import {
  getEdge,
  getNode,
  updateEdgeData,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const ToggleMarkerMidControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
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
              : markerType.markerMid,
        });
        takeSnapshotAndSave();
      }}
    />
  );
};

export default ToggleMarkerMidControl;
