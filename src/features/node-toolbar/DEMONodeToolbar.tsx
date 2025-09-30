import {
  EyeClosedIcon,
  EyeIcon,
  LinkBreakIcon,
  LinkIcon,
  PaintBrushHouseholdIcon,
  PencilIcon,
  SquareIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  NodeToolbar as _NodeToolbar,
  NodeToolbar,
  Position,
  useUpdateNodeInternals,
  type NodeToolbarProps,
} from "@xyflow/react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";
import {
  getNode,
  setAction,
  updateNode,
  updateNodeColor,
  updateNodeEditable,
  updateNodeFontSize,
  updateNodeHandlesVisibility,
  updateNodeTextAlign,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import type { DEMONode } from "../nodes/nodes.types";
import { useAttachStore } from "../actions/attach/useAttachStore";
import ToolbarMenu from "$/shared/components/ui/toolbar/ToolbarMenu";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import ToolbarMenuSection from "$/shared/components/ui/toolbar/ToolbarMenuSection";
import ToolbarMenuSeparator from "$/shared/components/ui/toolbar/ToolbarMenuSeparator";
import { useState } from "react";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import { COLOR_MAP } from "../../shared/components/ui/colors/colors.consts";
import DeleteMenuItem from "./actions/DeleteMenuItem";
import ShowTextBorderMenuItem from "./actions/ShowTextBorderMenuItem";
import AttachNodeMenuItem from "./actions/AttachMenuItem";
import ChangeColorMenuItem from "./actions/ChangeColorMenuItem";
import ToggleHandlesVisibilityMenuItem from "./actions/ToggleHandlesVisibilityMenuItem";
import ChangeScopeMenuItem from "./actions/ChangeScopeMenuItem";
import AddHandleMenuItem from "./actions/AddHandleMenuItem";
import ChangeFontSizeMenuItem from "./actions/ChangeFontSizeMenuItem";
import EditTextMenuItem from "./actions/EditTextMenuItem";
import ChangeStateMenuItem from "./actions/ChangeStateMenuItem";
import type { NodeToolbarAction } from "../nodes/DEMONodePrimitive";

const DEMONodeToolbar = ({
  nodeId,
  actions,
}: Omit<NodeToolbarProps, "nodeId"> & {
  nodeId?: string;
  actions?: NodeToolbarAction[] | null;
}) => {
  if (!nodeId) return null;
  const node = getNode(nodeId);
  if (!node) return null;

  return (
    <NodeToolbar
      position={Position.Right}
      isVisible={!node?.data?.isEditable && node?.selected}
    >
      <ToolbarMenu>
        {actions?.indexOf("changeFontSize") !== -1 && node.data?.fontSize && (
          <ChangeFontSizeMenuItem nodeId={nodeId} />
        )}
        {actions?.indexOf("addHandle") !== -1 && node.data?.handles && (
          <AddHandleMenuItem nodeId={nodeId} handles={node.data.handles} />
        )}
        {actions?.indexOf("changeState") !== -1 && node.data?.state && (
          <ChangeStateMenuItem
            nodeId={nodeId}
            state={node.data.state}
            nodeType={node.type}
          />
        )}
        {actions?.indexOf("changeScope") !== -1 && node.data?.scope && (
          <ChangeScopeMenuItem nodeId={nodeId} scope={node.data.scope} />
        )}
        {actions?.indexOf("changeColor") !== -1 && node?.data?.color && (
          <ChangeColorMenuItem nodeId={nodeId} scope={node.data.scope} />
        )}
        {actions?.indexOf("toggleHandlesVisibility") !== -1 &&
          node?.data?.handles && (
            <ToggleHandlesVisibilityMenuItem
              nodeId={nodeId}
              isVisible={node.data?.handles.isVisible}
            />
          )}
        {actions?.indexOf("attachNode") !== -1 && (
          <AttachNodeMenuItem nodeId={nodeId} parentId={node?.parentId} />
        )}
        {actions?.indexOf("showBorder") !== -1 &&
          node?.data?.isBorderVisible && (
            <ShowTextBorderMenuItem
              nodeId={nodeId}
              isBorderVisible={node.data?.isBorderVisible}
            />
          )}
        {actions?.indexOf("editText") !== -1 && node?.data?.content && (
          <EditTextMenuItem nodeId={nodeId} />
        )}

        {actions?.indexOf("delete") !== -1 && (
          <>
            <ToolbarMenuSeparator />
            <ToolbarMenuSection aria-label="Danger zone actions">
              <DeleteMenuItem nodeId={nodeId} />
            </ToolbarMenuSection>
          </>
        )}
      </ToolbarMenu>
    </NodeToolbar>
  );
};

export default DEMONodeToolbar;
