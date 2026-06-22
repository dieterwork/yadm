import type { Node } from "@xyflow/react";
import type { CSSProperties } from "react";
import type { DEMONodeContent } from "../nodes.types";

export type TextNode = Node<
  {
    content: Partial<DEMONodeContent>;
    fontSize: number;
    alignContent: string;
    textAlign: CSSProperties["textAlign"];
    isBorderVisible?: boolean;
    color?: string;
    isEditable?: boolean;
  },
  "text"
>;
