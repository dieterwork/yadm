import getNodeHandle from "$/features/connection_handles/utils/getHandle";
import type { DEMONode } from "$/features/nodes/nodes.types";

const doesSourceHaveDerivation = (
  sourceNode: DEMONode | undefined,
  sourceHandleId: string,
) => {
  if (sourceNode?.type !== "entity_type") return false;
  const handle = getNodeHandle(sourceNode, sourceHandleId);
  return !!handle?.handle.derivation && handle?.handle.derivation !== "none";
};

export default doesSourceHaveDerivation;
