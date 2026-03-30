import {
  ReactFlow,
  Background,
  MiniMap,
  ConnectionMode,
  BackgroundVariant,
  SelectionMode,
  ViewportPortal,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../../edges/edges.types";
import { nodeTypes } from "../../nodes/nodes.types";

import {
  onConnect,
  onConnectStart,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  onNodesDelete,
  onReconnect,
  onReconnectEnd,
  onReconnectStart,
  useDEMOModelerStore,
  type DEMOModelerState,
} from "../store/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import ConnectionLine from "../../connection_line/ConnectionLine";
import HelperLines from "../../helper_lines/HelperLines";
import {
  helperLinesSelector,
  useHelperLinesStore,
} from "../../helper_lines/useHelperLinesStore";
import { cn } from "@sglara/cn";
import SideMenu from "../../../shared/components/ui/toolbars/side_toolbar/SideToolbar";
import BottomToolbar from "../../../shared/components/ui/toolbars/bottom_toolbar/BottomToolbar";
import { resetAttach } from "../../actions/attach/useAttachStore";
import { usePreviewNode } from "../../preview_node/usePreviewNode";
import { useIncompleteEdge } from "../../edges/incomplete/useIncompleteEdge";
import useKeyboardShortcuts from "../../keyboard/useKeyboardShortcuts";
import useAttachNode from "../../actions/attach/useAttachNode";
import useTitleTranslate from "$/shared/hooks/useTitleTranslate";
import Notifications from "../../notifications/Notifications";
import DiamondMarker from "$/shared/components/ui/markers/DiamondMarker";
import takeSnapshotAndSave from "../../actions/undo/takeSnapshotAndSave";
import isValidConnection from "../utils/isValidConnection";
import onSelectionChange from "../utils/onSelectionChange";
import onViewportChange from "../utils/onViewportChange";

const reactFlowSelector = (state: DEMOModelerState) => ({
  isEnabled: state.isEnabled,
  nodes: state.nodes,
  edges: state.edges,
  action: state.action,
  isGridVisible: state.isGridVisible,
  isGridSnapEnabled: state.isGridSnapEnabled,
});

const DEMOModeler = () => {
  const { isEnabled, nodes, edges, action, isGridVisible, isGridSnapEnabled } =
    useDEMOModelerStore(useShallow(reactFlowSelector));

  const helperLines = useHelperLinesStore(useShallow(helperLinesSelector));

  const onConnectEnd = useIncompleteEdge();

  const { handleNodeAttach } = useAttachNode();

  useKeyboardShortcuts();
  usePreviewNode();
  useTitleTranslate();

  return (
    <div
      className="DEMO-modeler | [grid-area:modeler] h-full relative"
      data-action={action}
    >
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          zIndexMode="manual"
          elevateNodesOnSelect={false}
          data-action={action}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodeDragStart={() => {
            takeSnapshotAndSave();
          }}
          onNodesChange={onNodesChange}
          deleteKeyCode={null}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onConnectStart={onConnectStart}
          onConnect={onConnect}
          onViewportChange={onViewportChange}
          onConnectEnd={onConnectEnd}
          isValidConnection={isValidConnection}
          onSelectionChange={onSelectionChange}
          onPaneClick={() => {
            resetAttach();
          }}
          onReconnectStart={onReconnectStart}
          onReconnect={onReconnect}
          onReconnectEnd={onReconnectEnd}
          nodesFocusable={isEnabled}
          edgesFocusable={isEnabled}
          disableKeyboardA11y={false}
          fitView
          onNodeClick={(_, node) => {
            handleNodeAttach(node);
          }}
          connectionLineComponent={(props) => <ConnectionLine {...props} />}
          connectionMode={ConnectionMode.Loose}
          snapToGrid={isGridSnapEnabled}
          snapGrid={[10, 10]}
          edgesReconnectable={isEnabled}
          nodesDraggable={isEnabled}
          nodesConnectable={isEnabled}
          elementsSelectable={isEnabled}
          selectionOnDrag={action === "select"}
          selectionKeyCode={["Shift", "Meta"]}
          panOnDrag={action === "pan"}
          selectionMode={SelectionMode.Partial}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            bgColor="var(--color-white)"
            color="var(--color-slate-500)"
            variant={BackgroundVariant.Dots}
            className={cn(isGridVisible ? "visible" : "invisible")}
          />
          <MiniMap
            pannable={true}
            nodeColor="var(--color-slate-200)"
            draggable={!isEnabled}
            aria-expanded={isEnabled}
            className={cn(
              "transition-opacity",
              isEnabled
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
            bgColor="var(--color-white)"
            maskColor="var(--color-slate-100)"
          />
          <SideMenu />
          <BottomToolbar />
          <HelperLines
            isDisabled={!helperLines.isEnabled}
            horizontal={helperLines.horizontal}
            vertical={helperLines.vertical}
          />
          <Notifications />
          <ViewportPortal>
            <DiamondMarker />
          </ViewportPortal>
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
