import type { Node, BuiltInNode, NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import type { DEMOObjectType } from "../features/DEMO_objects/types";
import DEMOObjectNode from "./DEMOObjectNode";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type DEMOObjectNode = Node<{ type: DEMOObjectType }, "demo-object">;
export type AppNode = BuiltInNode | PositionLoggerNode | DEMOObjectNode;
export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "demo-object": DEMOObjectNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
