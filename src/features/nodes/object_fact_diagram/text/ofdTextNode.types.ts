import type { Node } from "@xyflow/react";

export type OFDTextNode = Node<
  { content: string; color: string },
  "ofd_text_node"
>;
