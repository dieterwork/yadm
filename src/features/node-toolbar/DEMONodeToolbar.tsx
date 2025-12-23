import {
  NodeToolbar as _NodeToolbar,
  NodeToolbar,
  Position,
  type NodeToolbarProps,
} from "@xyflow/react";
import { getNode, useDEMOModelerStore } from "../modeler/useDEMOModelerStore";
import ChangeFontSizeControl from "./actions/ChangeFontSizeControl";
import AddHandleControl from "./actions/AddHandleControl";
import ChangeStateControl from "./actions/ChangeStateControl";
import ChangeScopeControl from "./actions/ChangeScopeControl";
import type { NodeToolbarAction } from "../nodes/DEMONodeBase";
import ChangeColorControl from "./actions/ChangeColorControl";
import ToggleHandlesVisibilityControl from "./actions/ToggleHandlesVisibilityControl";
import AttachNodeControl from "./actions/AttachNodeControl";
import ToggleTextBorderControl from "./actions/ToggleTextBorderControl";
import EditTextControl from "./actions/EditTextControl";
import DEMOElementToolbarSeparator from "$/shared/components/ui/element_toolbar/DEMOElementToolbarSeparator";
import DEMOElementToolbarGroup from "$/shared/components/ui/element_toolbar/DEMOElementToolbarGroup";
import DeleteControl from "./actions/DeleteControl";
import DEMOElementToolbar from "$/shared/components/ui/element_toolbar/DEMOElementToolbar";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const DEMONodeToolbar = ({
  nodeId,
  actions,
}: Omit<NodeToolbarProps, "nodeId"> & {
  nodeId?: string;
  actions?: NodeToolbarAction[] | null;
}) => {
  const node = getNode(nodeId);

  const edges = useDEMOModelerStore((state) => state.edges);
  const nodes = useDEMOModelerStore((state) => state.nodes);

  const { t } = useTranslation();

  if (!nodeId) return null;
  if (!node) return null;

  const hasTwoOrMoreNodesSelected =
    nodes.filter((node) => node.selected).length > 1;
  const hasEdgeSelected = edges.some((edge) => edge.selected);

  return (
    <NodeToolbar
      position={Position.Right}
      isVisible={
        node?.selected && !hasTwoOrMoreNodesSelected && !hasEdgeSelected
      }
    >
      <DEMOElementToolbar>
        {actions?.indexOf("changeFontSize") !== -1 && (
          <ChangeFontSizeControl nodeId={nodeId} />
        )}
        {actions?.indexOf("addHandle") !== -1 && (
          <AddHandleControl nodeId={nodeId} />
        )}
        {actions?.indexOf("changeState") !== -1 && (
          <ChangeStateControl nodeId={nodeId} />
        )}
        {actions?.indexOf("changeScope") !== -1 && (
          <ChangeScopeControl nodeId={nodeId} />
        )}
        {actions?.indexOf("changeColor") !== -1 && (
          <ChangeColorControl nodeId={nodeId} />
        )}
        {actions?.indexOf("toggleHandlesVisibility") !== -1 && (
          <ToggleHandlesVisibilityControl nodeId={nodeId} />
        )}
        {actions?.indexOf("attachNode") !== -1 && (
          <AttachNodeControl nodeId={nodeId} />
        )}
        {actions?.indexOf("showBorder") !== -1 && (
          <ToggleTextBorderControl nodeId={nodeId} />
        )}
        {actions?.indexOf("editText") !== -1 && (
          <EditTextControl nodeId={nodeId} />
        )}

        {!!node.deletable && (
          <>
            {actions && actions.length > 1 && <DEMOElementToolbarSeparator />}
            <DEMOElementToolbarGroup
              aria-label={t(($) => $["Danger zone actions"])}
            >
              <DeleteControl nodeId={nodeId} />
            </DEMOElementToolbarGroup>
          </>
        )}
      </DEMOElementToolbar>
    </NodeToolbar>
  );
};

export default DEMONodeToolbar;
