import type { Node } from "@xyflow/react";
import type { CSSProperties } from "react";

export type TextNode = Node<
  {
    content: string;
    fontSize: number;
    alignContent: string;
    textAlign: CSSProperties["textAlign"];
  },
  "text_node"
>;
