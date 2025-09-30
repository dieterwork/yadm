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

import { useRef } from "react";
import {
  getNode,
  onConnect,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  onReconnect,
  onReconnectEnd,
  setAction,
  setDEMOInstance,
  updateNodeData,
  useDEMOModelerStore,
  type DEMOModelerState,
} from "./useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import { saveDEMOInstance } from "../save/saveDEMOInstance";
import { debounce } from "../../shared/utils/debounce";
import ConnectionLine from "../connection_line/ConnectionLine";
import useLocalJSONModel from "./useLocalJSONModel";
import HelperLines from "../helper_lines/HelperLines";
import { useHelperLinesStore } from "../helper_lines/useHelperLinesStore";
import { cn } from "@sglara/cn";
import SideMenu from "../../shared/components/ui/menus/side_menu/SideMenu";
import BottomMenu from "../../shared/components/ui/menus/bottom_menu/BottomMenu";
import { resetAttach, useAttachStore } from "../actions/attach/useAttachStore";
import convertAbsoluteToRelativePosition from "../nodes/utils/convertAbsoluteToRelativePosition";
import { usePreviewNode } from "../preview_node/usePreviewNode";
import { useIncompleteEdge } from "../edges/incomplete/useIncompleteEdge";
import useKeyboardShortcuts from "../keyboard/useKeyboardShortcuts";

const allowedConnectionMap = {
  // cooperation model
  actor: [
    "actor",
    "transaction",
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
  const {
    isEnabled,
    nodes,
    edges,
    action,
    DEMOInstance,
    isGridVisible,
    isGridSnapEnabled,
  } = useDEMOModelerStore(
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

  const ref = useRef<HTMLDivElement>(null!);

  const attachChildNodeId = useAttachStore((state) => state.childNodeId);

  const {
    horizontal: horizontalHelperLine,
    vertical: verticalHelperLine,
    updateHelperLines,
    isEnabled: areHelperLinesEnabled,
  } = useHelperLinesStore();

  const onConnectEnd = useIncompleteEdge();

  // const onNodeDragStart = (e: React.MouseEvent, node: DEMONode) => {
  //   const contentEditableElements = "";
  // };

  // const onNodeDragStop = (e: React.MouseEvent, node: DEMONode) => {};

  useLocalJSONModel();
  useKeyboardShortcuts();
  usePreviewNode();

  const childNodeIdAttach = useAttachStore((state) => state.childNodeId);

  const handleNodeAttach = (node: DEMONode) => {
    if (action !== "attach" || !childNodeIdAttach) return;
    const childNode = getNode(childNodeIdAttach);
    if (!childNode) {
      return console.error("Could not find child node");
    }
    if (node.parentId && node.type !== "transaction_kind") {
      return console.warn("Cannot attach to a node with an existing parent");
    }
    let parentNode;
    if (node.type === "transaction_kind" && node.parentId) {
      // get parent node
      const transactionTimeNode = getNode(node.parentId);
      if (!transactionTimeNode)
        throw new Error("Transaction kind does not have parent");
      parentNode = transactionTimeNode;
    } else {
      parentNode = node;
    }
    const newPosition = convertAbsoluteToRelativePosition(
      parentNode.position,
      childNode,
      nodes
    );
    updateNodeData(childNodeIdAttach, {
      parentId: parentNode.id,
      position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
    });
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

  return (
    <div
      className="DEMO-modeler | [grid-area:modeler] h-full"
      data-action={action}
    >
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          ref={ref}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => {
            const updatedChanges = updateHelperLines(changes, nodes);
            onNodesChange(updatedChanges);
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 3000);
          }}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 3000);
          }}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          isValidConnection={isValidConnection}
          onMove={() => {
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 3000);
          }}
          onBlur={() => {
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 3000);
          }}
          onPaneClick={() => {
            resetAttach();
          }}
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
          onSelectionEnd={() => {
            setTimeout(() => {
              setAction("pan");
            }, 0);
          }}
        >
          <Background
            bgColor="var(--color-white)"
            color="var(--color-slate-500)"
            variant={BackgroundVariant.Dots}
            className={cn(isGridVisible ? "visible" : "invisible")}
          />
          <MiniMap />
          <SideMenu />
          <BottomMenu />
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
