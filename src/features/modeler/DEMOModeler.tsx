import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type NodeMouseHandler,
  type Edge,
  type ReactFlowJsonObject,
  type NodeChange,
  ConnectionMode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes, type DEMOEdge } from "../edges/edges.types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useEffect, useState, type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { useDEMOModeler, type DEMOModelerState } from "./useDEMOModeler";
import { createNode } from "../nodes/utils/createNode";
import { useShallow } from "zustand/react/shallow";
import { convertAbsoluteToParentRelativePosition } from "../nodes/utils/convertAbsoluteToParentRelativePosition";
import {
  MEDIUM_NODE_SIZE,
  SMALL_NODE_SIZE,
  TRANSACTION_TIME_SIZE,
  X_SMALL_NODE_SIZE,
} from "../nodes/utils/consts";
import uuid from "../../shared/utils/uuid";
import SideMenu from "../side_menu/SideMenu";
import { saveDEMOInstance } from "../save/saveDEMOInstance";
import { debounce } from "../../shared/utils/debounce";
import ConnectionLine from "../edges/ConnectionLine";
import useLocalJSONModel from "./useLocalJSONModel";
import HelperLines from "../helper_lines/HelperLines";
import { useIncompleteEdge } from "../edges/incomplete/useIncompleteEdge";
import { useHelperLinesStore } from "../helper_lines/useHelperLinesStore";
import BottomMenu from "../bottom_menu/BottomMenu";
import useDelete from "../keyboard/useDelete";
import useCopyPaste from "../actions/copy_paste/useCopyPaste";

const ofdNodes = ["c_fact", "c_act", "tk_execution", "initiation_fact"];

const DEMOModeler = () => {
  const {
    addNode,
    nodes,
    edges,
    onConnect,
    onEdgesChange,
    onNodesChange,
    getNodeAbsolutePosition,
    setDEMOInstance,
    DEMOInstance,
    onReconnect,
    addEdge,
  } = useDEMOModeler(
    useShallow((state: DEMOModelerState) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addNode: state.addNode,
      getNodeAbsolutePosition: state.getNodeAbsolutePosition,
      setDEMOInstance: state.setDEMOInstance,
      DEMOInstance: state.DEMOInstance,
      onReconnect: state.onReconnect,
      addEdge: state.addEdge,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );
  const { screenToFlowPosition } = useReactFlow();
  const { previewNode, resetPreviewNode } = usePreviewNode(
    useShallow((state) => ({
      previewNode: state.previewNode,
      resetPreviewNode: state.reset,
    }))
  );

  const {
    horizontal: horizontalHelperLine,
    vertical: verticalHelperLine,
    updateHelperLines,
    isEnabled,
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
        type: "text_node",
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

  const handleObjectFactDiagramNodeAdd = (
    e: MouseEvent,
    clickedNode: DEMONode
  ) => {
    if (
      !previewNode ||
      !ofdNodes.includes(previewNode.type) ||
      !["transaction_time", "transaction_kind"].includes(clickedNode.type)
    )
      return;

    const absolutePosition = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    // get parent absolute position
    const parentAbsolutePosition = getNodeAbsolutePosition(clickedNode.id);

    // get relative position of ofd node
    const relativePosition = convertAbsoluteToParentRelativePosition({
      absolutePosition,
      nodeDimensions: { width: X_SMALL_NODE_SIZE, height: X_SMALL_NODE_SIZE },
      parentNode: clickedNode,
      parentAbsolutePosition,
    });

    const id = uuid();

    // create ofd node
    const ofdNode = createNode({
      type: previewNode.type,
      position:
        clickedNode.type === "transaction_time" ||
        clickedNode.type === "transaction_kind"
          ? relativePosition
          : absolutePosition,
      id,
      parentId:
        clickedNode.type === "transaction_time" ||
        clickedNode.type === "transaction_kind"
          ? clickedNode.type === "transaction_kind"
            ? clickedNode.parentId
            : clickedNode.id
          : undefined,
    });

    // create text node
    const textNode = createNode({
      type: "text_node",
      position: {
        x: X_SMALL_NODE_SIZE / 2 - 50 / 2,
        y: -X_SMALL_NODE_SIZE,
      },
      parentId: id,
      width: 50,
      height: 20,
      content: "",
    });

    addNode(ofdNode);
    addNode(textNode);

    // reset the preview node after clicking
    resetPreviewNode();
  };

  const handleNodeClick = (e: MouseEvent, node: DEMONode) => {
    handleObjectFactDiagramNodeAdd(e, node);
  };

  useLocalJSONModel();

  useCopyPaste({
    disabledNodeTypes: ["transaction_kind"],
  });

  useDelete();

  return (
    <div className="DEMO-modeler | [grid-area:modeler] h-full">
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
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
          onMove={() => {
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 1000);
          }}
          onBlur={() => {
            saveDEMOInstance(DEMOInstance);
          }}
          onReconnect={onReconnect}
          onReconnectEnd={onReconnectEnd}
          nodesFocusable={true}
          edgesFocusable={true}
          disableKeyboardA11y={false}
          fitView
          onPaneClick={handleClick}
          onNodeClick={handleNodeClick}
          onInit={(instance) => setDEMOInstance(instance)}
          connectionLineComponent={(props) => <ConnectionLine {...props} />}
          connectionMode={ConnectionMode.Loose}
        >
          <Background />
          <MiniMap />
          <SideMenu />
          <BottomMenu />
          <HelperLines
            isDisabled={!isEnabled}
            horizontal={verticalHelperLine}
            vertical={horizontalHelperLine}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
