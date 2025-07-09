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
import { edgeTypes } from "./edges/types";
import { nodeTypes, type AppNode } from "./nodes/types";
import { initialNodes } from "./nodes/initialNodes";
import { initialEdges } from "./edges/initialEdges";
import Toolbar from "./features/toolbar/Toolbar";
import "./index.css";
import { useToolbar } from "./features/toolbar/ToolbarStore";

import { v4 as uuid } from "uuid";
import NodeCursorPreview from "./features/node-cursor-preview/NodeCursorPreview";
import type { DEMOObjectType } from "./features/DEMO_objects/types";

const createNode = (
  nodeType: DEMOObjectType,
  position: XYPosition
): AppNode => {
  return {
    id: uuid(),
    type: "demo-object",
    position,
    data: { type: nodeType },
    style: { width: 100, height: 100, fill: "white", stroke: "black" },
    selected: true,
  };
};

const DEMOModeller = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const { selectedNodeType, setSelectedNodeType } = useToolbar();

  const onConnect: OnConnect = (connection) =>
    setEdges((edges) => addEdge(connection, edges));

  const onClick = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!selectedNodeType) {
      return;
    }

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = createNode(selectedNodeType, position);

    // Add node to the collection of nodes
    setNodes((nodes) => nodes.concat(newNode));

    // Make the menu select node null
    setSelectedNodeType(null);
  };

  return (
    <div className="demo-modeller h-full">
      <div className="react-flow-wrapper h-full">
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
          onClick={onClick}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <Toolbar />
      <NodeCursorPreview />
    </div>
  );
};
export default DEMOModeller;
