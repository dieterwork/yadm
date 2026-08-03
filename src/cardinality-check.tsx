import { createRoot } from "react-dom/client";
import { ConnectionMode, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./index.css";
import { nodeTypes, type DEMONode } from "./features/nodes/nodes.types";
import { edgeTypes } from "./features/edges/edges.types";
import { createNode } from "./features/nodes/utils/createNode";
import getEdgeData from "./features/modeler/utils/getEdgeData";
import {
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "./features/modeler/store/useDEMOModelerStore";
import type { DEMOEdge } from "./features/edges/edges.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t: any = () => "T";

const make = (type: string, x: number, y: number, id: string) => {
  const created = createNode({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: type as any,
    id,
    position: { x, y },
    translateFn: t,
    style: {},
  });
  return Array.isArray(created) ? created : [created];
};

const nodes = [
  ...make("entity_type", 40, 60, "a"),
  ...make("entity_type", 400, 60, "b"),
  // sits over the edge and its start label
  ...make("entity_type", 170, 40, "over"),
] as DEMONode[];

const withHandles = nodes.map((node) => node);

const source = withHandles[0];
const target = withHandles[1];
const getHandleId = (node: DEMONode, side: "right" | "left") =>
  "handles" in node.data
    ? node.data.handles?.[side]?.handles?.[0]?.id
    : undefined;

const edges: DEMOEdge[] = [
  {
    id: "edge_1",
    type: "object_fact_diagram_edge",
    source: source.id,
    target: target.id,
    sourceHandle: getHandleId(source, "right"),
    targetHandle: getHandleId(target, "left"),
    data: getEdgeData("object_fact_diagram_edge"),
    zIndex: 300,
  } as DEMOEdge,
];

setNodes(withHandles);
setEdges(edges);

const Preview = () => {
  const storeNodes = useDEMOModelerStore((state) => state.nodes);
  const storeEdges = useDEMOModelerStore((state) => state.edges);

  return (
    <ReactFlow
      nodes={storeNodes}
      edges={storeEdges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      zIndexMode="manual"
      connectionMode={ConnectionMode.Loose}
      defaultViewport={{ x: 0, y: 0, zoom: 1.6 }}
    />
  );
};

createRoot(document.getElementById("root")!).render(
  <ReactFlowProvider>
    <div style={{ width: "100vw", height: "100vh" }}>
      <Preview />
    </div>
  </ReactFlowProvider>,
);
