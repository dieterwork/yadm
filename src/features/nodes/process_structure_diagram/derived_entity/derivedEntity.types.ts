import type { Node } from "@xyflow/react";

export type DerivedEntityNode = Node<
  { content: string; color: string },
  "derived_entity"
>;
