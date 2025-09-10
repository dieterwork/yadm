import type { DEMONode } from "../../features/nodes/nodes.types";

export const sortNodes = (a: DEMONode, b: DEMONode): number => {
  if (a.type === b.type) {
    return 0;
  }
  return !a.parentId && a.parentId ? -1 : 1;
};
