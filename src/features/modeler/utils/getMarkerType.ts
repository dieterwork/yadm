import type { DEMONode } from "$/features/nodes/nodes.types";
import markerMap from "./markerMap";

const getMarkerType = (
  sourceNodeType: DEMONode["type"],
  targetNodeType: DEMONode["type"]
) => {
  const markerType = markerMap[sourceNodeType]?.find(
    (marker) => marker.id === targetNodeType
  );
  return {
    markerEnd: markerType?.markerEnd,
    markerStart: markerType?.markerStart,
  };
};

export default getMarkerType;
