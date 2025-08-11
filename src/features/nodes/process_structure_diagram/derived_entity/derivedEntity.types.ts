import type { Node } from "@xyflow/react";

export type DerivedEntityNode = Node<
  { content: string; color: string; fontSize: number },
  "derived_entity"
>;
