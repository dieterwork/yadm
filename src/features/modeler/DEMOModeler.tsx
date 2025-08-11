import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type NodeMouseHandler,
  type ReactFlowInstance,
  type Edge,
  type ReactFlowJsonObject,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../edges/types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useEffect, type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { useDEMOModeler, type DEMOModelerState } from "./useDEMOModeler";
import { createNode } from "../nodes/utils/createNode";
import { useShallow } from "zustand/react/shallow";
import { convertAbsoluteToParentRelativePosition } from "../nodes/utils/getNodePositionInsideParent";
import { SMALL_NODE_SIZE, X_SMALL_NODE_SIZE } from "../nodes/utils/consts";
import uuid from "../../shared/utils/uuid";
import SideMenu from "../side_menu/SideMenu";

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
    viewport,
    setViewport,
    setModelFromJSONObject,
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
      viewport: state.viewport,
      setViewport: state.setViewport,
      setModelFromJSONObject: state.setModelFromJSONObject,
    }))
  );
  const { screenToFlowPosition } = useReactFlow();
  const { previewNode, resetPreviewNode } = usePreviewNode(
    useShallow((state) => ({
      previewNode: state.previewNode,
      resetPreviewNode: state.reset,
    }))
  );

  const onNodeDragStart = (e: React.MouseEvent, node: DEMONode<unknown>) => {
    const contentEditableElements = "";
  };

  const onNodeDragStop = (e: React.MouseEvent, node: DEMONode<unknown>) => {};

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

    console.log("Added new node");

    resetPreviewNode();
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    addNodeFromSidebar(e);
  };

  const handleObjectFactDiagramNodeAdd = (
    e: MouseEvent,
    clickedNode: DEMONode<string>
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
      type: "ofd_text_node",
      position: {
        x: relativePosition.x,
        y: relativePosition.y,
      },
      parentId: id,
    });

    addNode(ofdNode);
    addNode(textNode);

    // reset the preview node after clicking
    resetPreviewNode();
  };

  const handleNodeClick: NodeMouseHandler<DEMONode<string>> = (e, node) => {
    handleObjectFactDiagramNodeAdd(e, node);
  };

  useEffect(() => {
    const localDEMOModelJSON = localStorage.getItem("demo-model");
    if (!localDEMOModelJSON) return;
    const localDEMOModel: ReactFlowJsonObject<
      DEMONode<string>,
      Edge
    > = JSON.parse(localDEMOModelJSON);
    setModelFromJSONObject(localDEMOModel);
  }, []);

  return (
    <div className="DEMO-modeler | [grid-area:modeler] h-full">
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          nodesFocusable={true}
          edgesFocusable={true}
          disableKeyboardA11y={false}
          fitView
          onClick={handleClick}
          onNodeClick={handleNodeClick}
          onInit={(instance) => setDEMOInstance(instance)}
          viewport={viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          <Background />
          <MiniMap />
          <Controls />
          <SideMenu />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
