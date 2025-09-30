import { IconContext, TextAaIcon, TrashIcon } from "@phosphor-icons/react";
import { type XYPosition } from "@xyflow/react";
import { Button, Menu, MenuTrigger, Popover } from "react-aria-components";
import { deleteEdge, getEdge } from "../../modeler/useDEMOModelerStore";
import EdgeToolbar from "./EdgeToolbar";
import ToolbarMenu from "$/shared/components/ui/toolbar/ToolbarMenu";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import DeleteMenuItem from "./actions/DeleteMenuItem";
import ToolbarMenuSeparator from "$/shared/components/ui/toolbar/ToolbarMenuSeparator";
import SwapConnectionMenuItem from "./actions/SwapConnectionMenuItem";
import ToolbarMenuSection from "$/shared/components/ui/toolbar/ToolbarMenuSection";
import ToggleProductionEventMenuItem from "./actions/ToggleProductionEventMenuItem";

export type EdgeToolbarAction =
  | "toggleProductionEvent"
  | "delete"
  | "swapConnection";
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
  sourceNodeId,
  targetNodeId,
}: DEMOEdgeToolbarProps) => {
  if (!edgeId) return null;
  const edge = getEdge(edgeId);
  if (!edge) return null;
  return (
    <EdgeToolbar xyPosition={position}>
      <ToolbarMenu>
        <ToolbarMenuSection aria-label="Edge actions">
          {actions?.indexOf("toggleProductionEvent") !== -1 && (
            <ToggleProductionEventMenuItem edgeId={edgeId} />
          )}
          {actions?.indexOf("swapConnection") !== -1 &&
            sourceNodeId &&
            targetNodeId && (
              <SwapConnectionMenuItem
                edgeId={edgeId}
                sourceNodeId={sourceNodeId}
                targetNodeId={targetNodeId}
              />
            )}
        </ToolbarMenuSection>
        {actions?.indexOf("delete") !== -1 && (
          <ToolbarMenuSection aria-label="Danger zone">
            <ToolbarMenuSeparator />
            <DeleteMenuItem edgeId={edgeId} />
          </ToolbarMenuSection>
        )}
      </ToolbarMenu>
    </EdgeToolbar>
  );
};

export default DEMOEdgeToolbar;
