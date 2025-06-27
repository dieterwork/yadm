import type { Node, BuiltInNode, NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type AppNode = BuiltInNode | PositionLoggerNode;
export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
