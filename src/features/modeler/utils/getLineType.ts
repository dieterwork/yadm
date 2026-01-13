import edgeMap from "./edgeMap";
import type { DEMONode } from "$/features/nodes/nodes.types";

const getEdgeType = (
  sourceNodeType: DEMONode["type"],
  targetNodeType: DEMONode["type"]
) => {
  const edgeType = edgeMap[sourceNodeType]?.find(
    (edge) => edge.id === targetNodeType
  )?.type;
  return edgeType;
};

export default getEdgeType;
