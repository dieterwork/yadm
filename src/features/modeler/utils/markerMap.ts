import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode, SubModel } from "$/features/nodes/nodes.types";
import { MarkerType, type EdgeMarkerType } from "@xyflow/react";

const closedMarker: EdgeMarkerType = {
  type: MarkerType.ArrowClosed,
  color: "var(--color-slate-900)",
};
// Todo make an object
const markerMap: Partial<
  Record<
    DEMONode["type"],
    {
      id: DEMONode["type"];
      markerStart?: EdgeMarkerType;
      markerEnd?: EdgeMarkerType;
    }[]
  >
> = {
  // cooperation model
  actor: [{ id: "ghost", markerEnd: closedMarker }],
  transaction: [{ id: "ghost", markerEnd: closedMarker }],
  transactor: [{ id: "ghost", markerEnd: closedMarker }],
  self_activation: [{ id: "ghost", markerEnd: closedMarker }],
  composite: [{ id: "ghost", markerEnd: closedMarker }],
  elementary_actor: [{ id: "ghost", markerEnd: closedMarker }],
  several_actors: [{ id: "ghost", markerEnd: closedMarker }],
  // ofd
  initiation_fact: [
    { id: "initiation_fact", markerEnd: closedMarker },
    { id: "c_fact", markerEnd: closedMarker },
    { id: "c_act", markerEnd: closedMarker },
    { id: "ghost", markerEnd: closedMarker },
  ],
  c_fact: [
    { id: "initiation_fact", markerEnd: closedMarker },
    { id: "c_fact", markerEnd: closedMarker },
    { id: "c_act", markerEnd: closedMarker },
    { id: "tk_execution", markerEnd: closedMarker },
    { id: "ghost", markerEnd: closedMarker },
  ],
  c_act: [
    { id: "initiation_fact", markerEnd: closedMarker },
    { id: "c_fact", markerEnd: closedMarker },
    { id: "tk_execution", markerEnd: closedMarker },
    { id: "ghost", markerEnd: closedMarker },
  ],
  tk_execution: [
    { id: "c_fact", markerEnd: closedMarker },
    { id: "c_act", markerEnd: closedMarker },
    { id: "ghost", markerEnd: closedMarker },
  ],
};

export default markerMap;
