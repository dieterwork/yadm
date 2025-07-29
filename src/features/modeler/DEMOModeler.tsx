import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../edges/types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import { useRef, type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { useDEMOModeler, type DEMOModelerState } from "./useDEMOModeler";
import { createNode } from "../nodes/utils/createNode";
import { useShallow } from "zustand/react/shallow";

const DEMOModeler = () => {
  const { addNode, nodes, edges, onConnect, onEdgesChange, onNodesChange } =
    useDEMOModeler(
      useShallow((state: DEMOModelerState) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        addNode: state.addNode,
      }))
    );
  const { screenToFlowPosition } = useReactFlow();
  const dropZoneRef = useRef<HTMLDivElement>(null!);
  const { previewNode, resetPreviewNode } = usePreviewNode();

  const onNodeDragStart = (e: React.MouseEvent, node: DEMONode<unknown>) => {
    const contentEditableElements = "";
  };

  const onNodeDragStop = (e: React.MouseEvent, node: DEMONode<unknown>) => {};

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!previewNode) return; // If no preview node, ignore the click event

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = createNode(previewNode.type, position);

    addNode(newNode);

    resetPreviewNode();
  };

  return (
    <div className="DEMO-modeler | [grid-area:modeler] h-full">
      <div className="react-flow-wrapper | h-full">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          snapToGrid
          snapGrid={[10, 10]}
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
          onClick={onClick}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DEMOModeler;
