import { type SVGAttributes } from "react";
import type { Node } from "@xyflow/react";

import type { DEMOObjectComponents } from "./DEMOObject";

export type DEMOObjectType = keyof typeof DEMOObjectComponents;

export type DEMOObjectProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

export type DEMOObjectComponentProps = Partial<DEMOObjectProps> & {
  type: DEMOObjectType;
  ref?: React.RefObject<SVGSVGElement>;
};

export type DEMOObjectNode = Node<{
  type: DEMOObjectType;
  color: string;
}>;
