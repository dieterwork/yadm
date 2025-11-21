import {
  ReactFlow,
  Background,
  MiniMap,
  ConnectionMode,
  BackgroundVariant,
  SelectionMode,
  type Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes, type DEMOEdge } from "../edges/edges.types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useEffect, useRef } from "react";
import {
  getNode,
  onConnect,
  onConnectStart,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  onReconnect,
  onReconnectEnd,
  onReconnectStart,
  setDEMOInstance,
  useDEMOModelerStore,
  type DEMOModelerState,
} from "./useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import ConnectionLine from "../connection_line/ConnectionLine";
import useLocalJSONModel from "./useLocalJSONModel";
import HelperLines from "../helper_lines/HelperLines";
import { useHelperLinesStore } from "../helper_lines/useHelperLinesStore";
import { cn } from "@sglara/cn";
import SideMenu from "../../shared/components/ui/toolbars/side_toolbar/SideToolbar";
import BottomToolbar from "../../shared/components/ui/toolbars/bottom_toolbar/BottomToolbar";
import { resetAttach, useAttachStore } from "../actions/attach/useAttachStore";
import { usePreviewNode } from "../preview_node/usePreviewNode";
import { useIncompleteEdge } from "../edges/incomplete/useIncompleteEdge";
import useKeyboardShortcuts from "../keyboard/useKeyboardShortcuts";
import useSave from "../actions/save/useSave";
import useAttachNode from "../actions/attach/useAttachNode";
import useTitleTranslate from "$/shared/hooks/useTitleTranslate";
import toast from "react-hot-toast/headless";
import { LinkIcon } from "@phosphor-icons/react";
import { useNodeDragHandlers } from "../nodes/hooks/useNodeDragHandlers";
import useTemporalDEMOModelerStore from "./useTemporalDEMOModelerStore";

const allowedConnectionMap = {
  // cooperation model
  actor: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "ghost",
  ],
  transaction: [
    "actor",
    "self_activation",
    "composite",
    "elementary_actor",
    "ghost",
  ],
  transactor: [
    "actor",
    "transaction",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "ghost",
  ],
  self_activation: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "ghost",
  ],
  composite: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "ghost",
  ],
  elementary_actor: ["transaction", "self_activation", "composite", "ghost"],
  several_actors: ["actor", "self_activation", "composite", "ghost"],
  // psd
  transaction_time: [
    "transaction_time",
    "initiation_fact",
    "c_fact",
    "c_act",
    "tk_execution",
    "ghost",
  ],
  initiation_fact: ["initiation_fact", "c_fact", "c_act", "ghost"],
  c_fact: ["initiation_fact", "c_fact", "c_act", "tk_execution", "ghost"],
  c_act: ["initiation_fact", "c_fact", "tk_execution", "ghost"],
  tk_execution: ["c_fact", "c_act", "ghost"],
  // ofd
  production_event: ["entity_class", "derived_entity", "ghost"],
  entity_class: ["entity_class", "derived_entity", "production_event", "ghost"],
  derived_entity: [
    "entity_class",
    "derived_entity",
    "production_event",
    "ghost",
  ],
  ghost: [
    "actor",
    "c_act",
    "c_fact",
    "composite",
    "derived_entity",
    "elementary_actor",
    "entity_class",
    "initiation_fact",
    "production_event",
    "self_activation",
    "several_actors",
    "tk_execution",
    "transaction_time",
    "transactor",
  ],
} satisfies Omit<
  Record<DEMONode["type"], DEMONode["type"][]>,
  "text" | "transaction_kind"
>;

const DEMOModeler = () => {
  const { isEnabled, nodes, edges, action, isGridVisible, isGridSnapEnabled } =
    useDEMOModelerStore(
      useShallow((state: DEMOModelerState) => ({
        isEnabled: state.isEnabled,
        nodes: state.nodes,
        edges: state.edges,
        action: state.action,
        DEMOInstance: state.DEMOInstance,
        isGridVisible: state.isGridVisible,
        isGridSnapEnabled: state.isGridSnapEnabled,
      }))
    );

  const { pause, resume, isTracking } = useTemporalDEMOModelerStore(
    (state) => state
  );
  useTitleTranslate();

  const ref = useRef<HTMLDivElement>(null!);

  const { autoSave } = useSave();

  const {
    horizontal: horizontalHelperLine,
    vertical: verticalHelperLine,
    isEnabled: areHelperLinesEnabled,
  } = useHelperLinesStore(
    useShallow((state) => ({
      horizontal: state.horizontal,
      vertical: state.vertical,
      isEnabled: state.isEnabled,
    }))
  );

  const onConnectEnd = useIncompleteEdge();

  useLocalJSONModel();
  useKeyboardShortcuts();
  usePreviewNode();

  const childNodeIdAttach = useAttachStore((state) => state.childNodeId);

  const { attachNode } = useAttachNode();

  const handleNodeAttach = (node: DEMONode) => {
    if (action !== "attach" || !childNodeIdAttach) return;
    if (!childNodeIdAttach) {
      return console.error("Could not find child node");
    }
    if (node.parentId && node.type !== "transaction_kind") {
      return console.warn("Cannot attach to a node with an existing parent");
    }
    let parentNodeId = node.id;
    if (node.type === "transaction_kind" && node.parentId) {
      // get parent node
      const transactionTimeNode = getNode(node.parentId);
      if (!transactionTimeNode)
        throw new Error("Transaction kind does not have parent");
      parentNodeId = transactionTimeNode.id;
    }

    attachNode([childNodeIdAttach], parentNodeId);
    const childNode = getNode(childNodeIdAttach);
    const parentNode = getNode(parentNodeId);
    toast(
      `Attached ${childNode.ariaLabel} node to ${parentNode.ariaLabel} node`,
      {
        icon: "link",
      }
    );

    resetAttach();
  };

  const isValidConnection = (connection: DEMOEdge | Connection) => {
    const sourceNode = getNode(connection.source);
    const targetNode = getNode(connection.target);
    if (
      !sourceNode ||
      !targetNode ||
      sourceNode.type === "transaction_kind" ||
      sourceNode.type === "text"
    )
      return false;
    const allowedConnections = allowedConnectionMap[sourceNode?.type];
    if (!allowedConnections.includes(targetNode?.type)) return false;
    return true;
  };

  const { onNodeDrag, onNodeDragStop } = useNodeDragHandlers();

  return (
    <div
      className="DEMO-modeler | [grid-area:modeler] h-full"
      data-action={action}
    >
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          elevateNodesOnSelect={false}
          data-action={action}
          ref={ref}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodeDragStart={() => {
            if (isTracking) {
              console.log("pause");
              pause();
            }
          }}
          onNodeDrag={(...params) => {
            onNodeDrag(...params);
          }}
          onNodeDragStop={(...params) => {
            onNodeDragStop(...params);
            if (!isTracking) {
              console.log("resume");
              resume();
            }
          }}
          onNodesChange={(changes) => {
            onNodesChange(changes);
            autoSave();
          }}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            autoSave();
          }}
          onEdgesDelete={onEdgesDelete}
          onConnectStart={onConnectStart}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          isValidConnection={isValidConnection}
          onMoveEnd={() => {
            autoSave();
          }}
          onBlur={() => {
            autoSave();
          }}
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
          onNodeClick={(e, node) => {
            handleNodeAttach(node);
          }}
          onInit={(instance) => setDEMOInstance(instance)}
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
            isDisabled={!areHelperLinesEnabled}
            horizontal={horizontalHelperLine}
            vertical={verticalHelperLine}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
