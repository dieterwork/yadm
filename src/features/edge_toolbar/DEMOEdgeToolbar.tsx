import { type XYPosition } from "@xyflow/react";
import {
  getEdge,
  getNode,
  useDEMOModelerStore,
} from "$features/modeler/store/useDEMOModelerStore";
import EdgeToolbar from "./EdgeToolbar";
import DeleteMenuItem from "./actions/DeleteEdgeControl";
import DEMOElementToolbar from "$/shared/components/ui/element_toolbar/DEMOElementToolbar";
import DEMOElementToolbarGroup from "$/shared/components/ui/element_toolbar/DEMOElementToolbarGroup";
import DEMOElementToolbarSeparator from "$/shared/components/ui/element_toolbar/DEMOElementToolbarSeparator";
import ChangeLineTypeControl from "./actions/ChangeLineTypeControl";
import ToggleProductionEventMenuItem from "./actions/ToggleProductionEventControl";
import SwapConnectionControl from "./actions/SwapConnectionControl";
import { useTranslation } from "react-i18next";
import ChangeLinePathControl from "./actions/ChangeLinePath";
import ChangeLawControl from "./actions/ChangeLawControl";
import ChangeDerivationControl from "./actions/ChangeDerivation";
import ChangeMarkerControl from "./actions/ChangeMarkerControl";
import getNodeHandle from "../connection_handles/utils/getHandle";

export type EdgeToolbarAction =
  | "toggleProductionEvent"
  | "swapConnection"
  | "changeLineType"
  | "resetEdgeCenter"
  | "changeLinePath"
  | "changeLaw"
  | "changeDerivation"
  | "changeMarker";
interface DEMOEdgeToolbarProps {
  edgeId?: string;
  position?: XYPosition;
  actions?: EdgeToolbarAction[];
  sourceNodeId?: string;
  targetNodeId?: string;
}

const DEMOEdgeToolbar = ({
  edgeId,
  position,
  actions,
}: DEMOEdgeToolbarProps) => {
  const edges = useDEMOModelerStore((state) => state.edges);
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const { t } = useTranslation();

  if (!edgeId) return null;
  const edge = getEdge(edgeId);
  if (!edge) return null;

  const sourceNode = getNode(edge.source);
  const targetNode = getNode(edge.target);

  const hasTwoOrMoreEdgesSelected =
    edges.filter((edge) => edge.selected).length > 1;

  const hasNodeSelected = nodes.some((node) => node.selected);

  const targetHandle = getNodeHandle(targetNode, edge.targetHandle);

  const numOfEdgesConnectedToTargetHandle = edges.filter(
    (e) => e.targetHandle === edge.targetHandle,
  ).length;

  const multipleConnectionsToDerivationHandle =
    sourceNode?.type === "entity_type" &&
    !!targetHandle?.handle.derivation &&
    targetHandle?.handle.derivation !== "none" &&
    numOfEdgesConnectedToTargetHandle > 1;

  return (
    <EdgeToolbar
      xyPosition={position}
      isVisible={!hasNodeSelected && !hasTwoOrMoreEdgesSelected}
    >
      <DEMOElementToolbar>
        <DEMOElementToolbarGroup aria-label={t(($) => $["Edge options"])}>
          {actions?.indexOf("changeLineType") !== -1 && (
            <ChangeLineTypeControl edgeId={edgeId} />
          )}
          {actions?.indexOf("changeLinePath") !== -1 && (
            <ChangeLinePathControl edgeId={edgeId} />
          )}
          {actions?.indexOf("toggleProductionEvent") !== -1 && (
            <ToggleProductionEventMenuItem edgeId={edgeId} />
          )}
          {actions?.indexOf("swapConnection") !== -1 &&
            (targetNode?.type !== "ghost" || sourceNode?.type === "ghost") &&
            !multipleConnectionsToDerivationHandle && (
              <SwapConnectionControl edgeId={edgeId} />
            )}
          {actions?.indexOf("changeLaw") !== -1 && (
            <ChangeLawControl edgeId={edgeId} />
          )}
          {actions?.indexOf("changeDerivation") !== -1 &&
            targetNode?.type === "entity_type" && (
              <ChangeDerivationControl edgeId={edgeId} />
            )}
          {actions?.indexOf("changeMarker") !== -1 && (
            <ChangeMarkerControl edgeId={edgeId} />
          )}
        </DEMOElementToolbarGroup>
        {!!edge.deletable && (
          <DEMOElementToolbarGroup aria-label={t(($) => $["Danger zone"])}>
            {actions?.length !== 1 && <DEMOElementToolbarSeparator />}
            <DeleteMenuItem edgeId={edgeId} />
          </DEMOElementToolbarGroup>
        )}
      </DEMOElementToolbar>
    </EdgeToolbar>
  );
};

export default DEMOEdgeToolbar;
