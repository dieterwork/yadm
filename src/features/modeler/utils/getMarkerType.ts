import type { DEMONode } from "$/features/nodes/nodes.types";
import markerMap from "./markerMap";

const getMarkerType = (
  sourceNodeType: DEMONode["type"],
  targetNodeType: DEMONode["type"],
  state: "initial" | "default" = "default",
) => {
  const markerType = markerMap[sourceNodeType]?.find(
    (marker) => marker.id === targetNodeType,
  )?.[state];
  return {
    markerEnd: markerType?.markerEnd,
    markerStart: markerType?.markerStart,
    markerMid: markerType?.markerMid,
  };
};

export default getMarkerType;
