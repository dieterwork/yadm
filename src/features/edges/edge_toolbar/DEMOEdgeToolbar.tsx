import { type XYPosition } from "@xyflow/react";
import {
  getEdge,
  useDEMOModelerStore,
} from "../../modeler/useDEMOModelerStore";
import EdgeToolbar from "./EdgeToolbar";
import DeleteMenuItem from "./actions/DeleteEdgeControl";
import DEMOElementToolbar from "$/shared/components/ui/element_toolbar/DEMOElementToolbar";
import DEMOElementToolbarGroup from "$/shared/components/ui/element_toolbar/DEMOElementToolbarGroup";
import DEMOElementToolbarSeparator from "$/shared/components/ui/element_toolbar/DEMOElementToolbarSeparator";
import ChangeLineTypeControl from "./actions/ChangeLineTypeControl";
import ToggleProductionEventMenuItem from "./actions/ToggleProductionEventControl";
import SwapConnectionControl from "./actions/SwapConnectionControl";
import { useTranslation } from "react-i18next";

export type EdgeToolbarAction =
  | "toggleProductionEvent"
  | "delete"
  | "swapConnection"
  | "changeLineType";
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
  if (!edgeId) return null;
  const edge = getEdge(edgeId);
  if (!edge) return null;

  const edges = useDEMOModelerStore((state) => state.edges);
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const hasTwoOrMoreEdgesSelected =
    edges.filter((edge) => edge.selected).length > 1;
  const hasNodeSelected = nodes.some((node) => node.selected);

  const { t } = useTranslation();

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
          {actions?.indexOf("toggleProductionEvent") !== -1 && (
            <ToggleProductionEventMenuItem edgeId={edgeId} />
          )}
          {actions?.indexOf("swapConnection") !== -1 && (
            <SwapConnectionControl edgeId={edgeId} />
          )}
        </DEMOElementToolbarGroup>
        {actions?.indexOf("delete") !== -1 && (
          <DEMOElementToolbarGroup aria-label={t(($) => $["Danger zone"])}>
            <DEMOElementToolbarSeparator />
            <DeleteMenuItem edgeId={edgeId} />
          </DEMOElementToolbarGroup>
        )}
      </DEMOElementToolbar>
    </EdgeToolbar>
  );
};

export default DEMOEdgeToolbar;
