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
import { edgeTypes } from "../edges/edges.types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useState, type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { useDEMOModeler, type DEMOModelerState } from "./useDEMOModeler";
import { createNode } from "../nodes/utils/createNode";
import { useShallow } from "zustand/react/shallow";
import { convertAbsoluteToParentRelativePosition } from "../nodes/utils/getNodePositionInsideParent";
import { X_SMALL_NODE_SIZE } from "../nodes/utils/consts";
import uuid from "../../shared/utils/uuid";
import SideMenu from "../side_menu/SideMenu";
import { saveDEMOInstance } from "../save/saveDEMOInstance";
import { debounce } from "../../shared/utils/debounce";
import ConnectionLine from "../edges/ConnectionLine";
import useCopyPaste from "../copy_paste/useCopyPaste";
import useLocalJSONModel from "./useLocalJSONModel";
import HelperLines from "../helper_lines/HelperLines";
import { useHelperLines } from "../helper_lines/useHelperLines";

const transactionTimeNodes = [
  "c_act",
  "c_fact",
  "initiation_fact",
  "tk_execution",
];

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
    viewport,
    setViewport,
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
      viewport: state.viewport,
      setViewport: state.setViewport,
    }))
  );
  const { screenToFlowPosition } = useReactFlow();
  const { previewNode, resetPreviewNode } = usePreviewNode(
    useShallow((state) => ({
      previewNode: state.previewNode,
      resetPreviewNode: state.reset,
    }))
  );

  const onNodeDragStart = (e: React.MouseEvent, node: DEMONode) => {
    const contentEditableElements = "";
  };

  const onNodeDragStop = (e: React.MouseEvent, node: DEMONode) => {};

  const addNodeFromSidebar = (e: MouseEvent) => {
    if (!previewNode) return; // If no preview node, ignore the click event

    // cancel node add for c-act, c-fact, initiation-fact, tk-excution
    // only add these if transaction time node was clicked
    if (transactionTimeNodes.includes(previewNode.type)) return;

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = createNode({ type: previewNode.type, position });

    addNode(newNode);

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
    if (!previewNode) return;
    if (
      clickedNode.type !== "transaction_time_inner" &&
      clickedNode.type !== "transaction_kind"
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
      position: relativePosition,
      id,
      parentId:
        clickedNode.type === "transaction_kind"
          ? clickedNode.parentId
          : clickedNode.id,
    });

    // create text node

    const textNode = createNode({
      type: "text_node",
      position: {
        x: X_SMALL_NODE_SIZE + 2,
        y: X_SMALL_NODE_SIZE / 2 - 20 / 2,
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
    disabledNodeTypes: ["transaction_time_inner", "transaction_kind"],
  });

  const { helperLineHorizontal, helperLineVertical, updateHelperLines } =
    useHelperLines();

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
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          onMove={() => {
            debounce(() => {
              saveDEMOInstance(DEMOInstance);
            }, 1000);
          }}
          onBlur={() => {
            saveDEMOInstance(DEMOInstance);
          }}
          nodesFocusable={true}
          edgesFocusable={true}
          disableKeyboardA11y={false}
          fitView
          onPaneClick={handleClick}
          onNodeClick={handleNodeClick}
          onInit={(instance) => setDEMOInstance(instance)}
          viewport={viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
          connectionLineComponent={(props) => <ConnectionLine {...props} />}
          connectionMode={ConnectionMode.Loose}
        >
          <Background />
          <MiniMap />
          <Controls />
          <SideMenu />
          <HelperLines
            horizontal={helperLineHorizontal}
            vertical={helperLineVertical}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
