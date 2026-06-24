import type { DEMONode } from "$/features/nodes/nodes.types";

const getNodeHandle = (
  node: DEMONode | undefined,
  id: string | null | undefined,
) => {
  if (!node) return undefined;
  if (!id) return undefined;
  if (!("handles" in node.data) || !node.data.handles) return undefined;
  const { top, bottom, left, right } = node.data.handles;
  for (const [position, handleGroup] of Object.entries({
    top,
    bottom,
    left,
    right,
  }) as [keyof typeof node.data.handles, typeof top][]) {
    const match = handleGroup?.handles?.find((h) => h.id === id);
    if (match) return { position, handle: match };
  }
  return undefined;
};

export default getNodeHandle;
