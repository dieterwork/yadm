import {
  ReactFlow,
  Background,
  MiniMap,
  useReactFlow,
  ConnectionMode,
  BackgroundVariant,
  useUpdateNodeInternals,
  SelectionMode,
  type Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes, type DEMOEdge } from "../edges/edges.types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useEffect, useRef, type MouseEvent } from "react";
import {
  setPanOnDrag,
  setSelectionOnDrag,
  useDEMOModeler,
  type DEMOModelerState,
} from "./useDEMOModeler";
import { createNode } from "../nodes/utils/createNode";
import { useShallow } from "zustand/react/shallow";
import {
  SMALL_NODE_SIZE,
  TRANSACTION_TIME_SIZE,
  X_SMALL_NODE_SIZE,
} from "../nodes/utils/consts";
import uuid from "../../shared/utils/uuid";
import { saveDEMOInstance } from "../save/saveDEMOInstance";
import { debounce } from "../../shared/utils/debounce";
import ConnectionLine from "../connection_line/ConnectionLine";
import useLocalJSONModel from "./useLocalJSONModel";
import HelperLines from "../helper_lines/HelperLines";
import { useIncompleteEdge } from "../edges/incomplete/useIncompleteEdge";
import { useHelperLinesStore } from "../helper_lines/useHelperLinesStore";
import useDelete from "../keyboard/useDelete";
import useCopyPaste from "../actions/copy_paste/useCopyPaste";
import { cn } from "@sglara/cn";
import SideMenu from "../menus/side_menu/SideMenu";
import BottomMenu from "../menus/bottom_menu/BottomMenu";
import { useAttachStore } from "../actions/attach/useAttachStore";
import convertAbsoluteToRelativePosition from "../nodes/utils/convertAbsoluteToRelativePosition";
import { usePreviewNodeStore } from "../preview_node/usePreviewNodeStore";
import { usePreviewNode } from "../preview_node/usePreviewNode";

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
  production_event: ["entity_class", "derived_entity"],
  entity_class: ["entity_class", "derived_entity", "production_event"],
  derived_entity: ["entity_class", "derived_entity", "production_event"],
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
    onConnect,
    onEdgesChange,
    onNodesChange,
    setDEMOInstance,
    DEMOInstance,
    onReconnect,
    grid,
    getNode,
    updateNode,
    selectionOnDrag,
    panOnDrag,
  } = useDEMOModeler(
    useShallow((state: DEMOModelerState) => ({
      isEnabled: state.isEnabled,
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addNode: state.addNode,
      setDEMOInstance: state.setDEMOInstance,
      DEMOInstance: state.DEMOInstance,
      onReconnect: state.onReconnect,
      addEdge: state.addEdge,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      grid: state.grid,
      getNode: state.getNode,
      updateNode: state.updateNode,
      selectionOnDrag: state.selectionOnDrag,
      panOnDrag: state.panOnDrag,
    }))
  );

  const ref = useRef<HTMLDivElement>(null!);

  usePreviewNode({ reactFlowRef: ref });

  const { childNodeIdAttach, resetAttachStore, isAttaching } = useAttachStore(
    useShallow((state) => ({
      childNodeIdAttach: state.childNodeId,
      resetAttachStore: state.reset,
      isAttaching: state.isAttaching,
    }))
  );

  const {
    horizontal: horizontalHelperLine,
    vertical: verticalHelperLine,
    updateHelperLines,
    isEnabled: areHelperLinesEnabled,
  } = useHelperLinesStore();

  const { onConnectEnd, onEdgesDelete, onReconnectEnd } = useIncompleteEdge();

  // const onNodeDragStart = (e: React.MouseEvent, node: DEMONode) => {
  //   const contentEditableElements = "";
  // };

  // const onNodeDragStop = (e: React.MouseEvent, node: DEMONode) => {};

  useLocalJSONModel();
  useCopyPaste({
    disabledNodeTypes: ["transaction_kind"],
  });
  useDelete();

  const handleNodeAttach = (node: DEMONode) => {
    if (!isAttaching || !childNodeIdAttach) return;
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
    updateNode(childNodeIdAttach, {
      parentId: parentNode.id,
      position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
    });
    resetAttachStore();
  };

  const previewNode = usePreviewNodeStore((state) => state.previewNode);

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
    if (!allowedConnections.includes(targetNode.type)) return false;
    return true;
  };

  return (
    <div
      className="DEMO-modeler | [grid-area:modeler] h-full"
      data-selecting={selectionOnDrag}
      data-panning={panOnDrag}
      data-dropping={!!previewNode}
    >
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          ref={ref}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => {
            const updatedChanges = updateHelperLines(changes, nodes);
            onNodesChange(updatedChanges);
            saveDEMOInstance(DEMOInstance);
          }}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            saveDEMOInstance(DEMOInstance);
          }}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onConnectStart={() => {
            console.log("start");
          }}
          isValidConnection={isValidConnection}
          onMove={() => {
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 1000);
          }}
          onBlur={() => {
            saveDEMOInstance(DEMOInstance);
          }}
          onPaneClick={() => {
            resetAttachStore();
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
          snapToGrid={grid.isSnapEnabled}
          snapGrid={[10, 10]}
          edgesReconnectable={isEnabled}
          nodesDraggable={isEnabled}
          nodesConnectable={isEnabled}
          elementsSelectable={isEnabled}
          selectionOnDrag={selectionOnDrag}
          selectionKeyCode={["Shift", "Meta"]}
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          onSelectionEnd={() => {
            setTimeout(() => {
              setPanOnDrag(true);
              setSelectionOnDrag(false);
            }, 0);
          }}
        >
          <Background
            color="var(--color-slate-400)"
            variant={BackgroundVariant.Dots}
            className={cn(grid.isVisible ? "visible" : "invisible")}
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
