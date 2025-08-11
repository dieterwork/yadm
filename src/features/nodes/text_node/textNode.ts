import type { Node } from "@xyflow/react";

export type TextNode = Node<{ content: string; fontSize: number }, "text_node">;
