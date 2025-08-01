import type { Node } from "@xyflow/react";

export type ProductionEventNode = Node<
  { content: string[]; color: string },
  "production_event"
>;
