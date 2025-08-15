import type { Node } from "@xyflow/react";
import CSS from "csstype";

export type TextNode = Node<
  {
    content: string;
    fontSize: number;
    alignContent: string;
    textAlign: CSS.Properties["textAlign"];
  },
  "text_node"
>;
