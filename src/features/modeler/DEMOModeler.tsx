import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  useReactFlow,
  type XYPosition,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../../edges/types";
import { nodeTypes, type AppNode } from "../../nodes/types";
import { initialNodes } from "../../nodes/initialNodes";
import { initialEdges } from "../../edges/initialEdges";
import { useToolbar } from "../toolbar/ToolbarStore";

import uuid from "../../shared/utils/uuid";
import { YADM_DATA_TYPE } from "../drag-and-drop/utils";
import { useRef, type DragEvent, type DragEventHandler } from "react";
import { DropZone } from "react-aria-components";
import type { DropEvent, TextDropItem } from "react-aria";

const createNode = (
  nodeType: "actor" | "transactor" | "transaction",
  position: XYPosition
): AppNode => {
  switch (nodeType) {
    case "actor":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default" },
        style: { width: 100, height: 100, fill: "white", stroke: "black" },
        selected: true,
      };
    case "transaction":
      return {
        id: uuid(),
        type: nodeType,
        position,
        data: { state: "default" },
        style: { width: 100, height: 100, fill: "white", stroke: "black" },
        selected: true,
      };
    default:
      throw new Error(`Could not find node type ${nodeType}`);
  }
};

const DEMOModeler = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const dropZoneRef = useRef<HTMLDivElement>(null!);

  const onConnect: OnConnect = (connection) =>
    setEdges((edges) => addEdge(connection, edges));

  const onNodeDragStart = (e: React.MouseEvent, node: AppNode) => {
    const contentEditableElements = "";
    console.log(node);
  };

  const onNodeDragStop = (e: React.MouseEvent, node: AppNode) => {};

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    console.log("Drag over");
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (e: DropEvent) => {
    const [type] = await Promise.all(
      e.items
        .filter(
          (item) => item.kind === "text" && item.types.has(YADM_DATA_TYPE)
        )
        .map((item: TextDropItem) => item.getText(YADM_DATA_TYPE))
    );

    if (!type) throw new Error(`Error finding node type ${type}`);

    // this will convert the pixel position of the node to the react flow coordinate system
    // so that a node is added at the correct position even when viewport is translated and/or zoomed in
    const bounds = dropZoneRef.current.getBoundingClientRect();
    const position = screenToFlowPosition({
      x: e.x + bounds.left,
      y: e.y + bounds.top,
    });

    const newNode = createNode(type, position);

    setNodes((nodes) =>
      nodes.map((n) => ({ ...n, selected: false })).concat([newNode])
    );
  };

  return (
    <div className="DEMO-modeler | [grid-area:modeler] h-full">
      <div className="viewer-wrapper | h-full">
        <DropZone className="h-full" onDrop={onDrop} ref={dropZoneRef}>
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
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </DropZone>
      </div>
    </div>
  );
};

export default DEMOModeler;
