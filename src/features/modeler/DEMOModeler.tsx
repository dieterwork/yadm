import {
  ReactFlow,
  Background,
  MiniMap,
  useReactFlow,
  ConnectionMode,
  BackgroundVariant,
  useUpdateNodeInternals,
  SelectionMode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../edges/edges.types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
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

const ofdNodes = ["c_fact", "c_act", "tk_execution", "initiation_fact"];

const DEMOModeler = () => {
  const {
    isEnabled,
    addNode,
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
  const { screenToFlowPosition } = useReactFlow();
  const { previewNode, resetPreviewNode } = usePreviewNode(
    useShallow((state) => ({
      previewNode: state.previewNode,
      resetPreviewNode: state.reset,
    }))
  );

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

  const addNodeFromSidebar = (e: MouseEvent) => {
    if (!previewNode) return; // If no preview node, ignore the click event

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const id = uuid();

    const newNode = createNode({ id, type: previewNode.type, position });

    addNode(newNode);

    if (ofdNodes.includes(previewNode.type)) {
      // create text node
      const textNode = createNode({
        type: "text",
        position: {
          x: X_SMALL_NODE_SIZE / 2 - 50 / 2,
          y: -X_SMALL_NODE_SIZE,
        },
        parentId: id,
        width: 50,
        height: 20,
        content: "",
      });
      addNode(textNode);
    }

    if (previewNode.type === "transaction_time") {
      const ghostNode1Id = uuid();
      const ghostNode2Id = uuid();

      // add ghosts
      addNode({
        id: `ghost-${ghostNode1Id}`,
        type: "ghost",
        position: {
          x: 40 + TRANSACTION_TIME_SIZE,
          y: SMALL_NODE_SIZE / 2 + 3,
        },
        data: {},
        parentId: newNode[0].id,
      });

      addNode({
        id: `ghost-${ghostNode2Id}`,
        type: "ghost",
        position: {
          x: -40,
          y: SMALL_NODE_SIZE / 2 + 3,
        },
        data: {},
        parentId: newNode[0].id,
      });

      // addEdge({
      //   id: `${newNode[0].id}->ghost-${ghostNode1Id}`,
      //   type: "transaction_time_edge",
      //   source: newNode[0].id,
      //   sourceHandle: newNode[0].data.handles.right.handles[0].id,
      //   target: `ghost-${ghostNode1Id}`,
      // });

      // addEdge({
      //   id: `${newNode[0].id}->ghost-${ghostNode2Id}`,
      //   type: "transaction_time_edge",
      //   source: newNode[0].id,
      //   sourceHandle: newNode[0].data.handles.left.handles[0].id,
      //   target: `ghost-${ghostNode2Id}`,
      // });
    }

    resetPreviewNode();
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    addNodeFromSidebar(e);
  };

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

  return (
    <div
      className="DEMO-modeler | [grid-area:modeler] h-full"
      data-selecting={selectionOnDrag}
      data-panning={panOnDrag}
    >
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => {
            const updatedChanges = updateHelperLines(changes, nodes);
            onNodesChange(updatedChanges);
            saveDEMOInstance(DEMOInstance);
          }}
          onClick={handleClick}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            saveDEMOInstance(DEMOInstance);
          }}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
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
            // TODO fix this later
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
