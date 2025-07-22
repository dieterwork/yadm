import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type XYPosition,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../edges/types";
import { nodeTypes, type DEMONode } from "../nodes/nodes.types";

import uuid from "../../shared/utils/uuid";
import { useRef, type MouseEvent } from "react";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { useDEMOModeler } from "./useDEMOModeler";

const createNode = <T extends string>(
  nodeType: "actor" | "transactor" | "transaction",
  position: XYPosition
): DEMONode<T> => {
  switch (nodeType) {
    case "actor":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: ["A", "Actor1"] },
        style: { width: 100, height: 100, fill: "white", stroke: "black" },
        selected: true,
      };
    case "transaction":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default", content: ["T", "Transaction1"] },
        style: { width: 100, height: 100, fill: "white", stroke: "black" },
        selected: true,
      };
    default:
      throw new Error(`Could not find node type ${nodeType}`);
  }
};

const DEMOModeler = () => {
  const { addNode, nodes, edges, onConnect, onEdgesChange, onNodesChange } =
    useDEMOModeler();
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
