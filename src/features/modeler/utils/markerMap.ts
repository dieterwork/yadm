import type { DEMONode } from "$/features/nodes/nodes.types";
import { MarkerType, type EdgeMarkerType } from "@xyflow/react";
import closedMarker from "./closedMarker";

// Todo make an object
const markerMap: Partial<
  Record<
    DEMONode["type"],
    {
      id: DEMONode["type"];
      initial: {
        markerStart?: EdgeMarkerType;
        markerEnd?: EdgeMarkerType;
        markerMid?: EdgeMarkerType;
      };
      default: {
        markerStart?: EdgeMarkerType;
        markerEnd?: EdgeMarkerType;
        markerMid?: EdgeMarkerType;
      };
    }[]
  >
> = {
  // cooperation model
  actor: [
    {
      id: "ghost",
      default: {
        markerEnd: closedMarker,
      },
      initial: {
        markerEnd: closedMarker,
      },
    },
  ],
  transaction: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  transactor: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  self_activation: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  composite: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  elementary_actor: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  several_actors: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  // ofd
  initiation_fact: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  c_fact: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "tk_execution",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  c_act: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "tk_execution",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  tk_execution: [
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  production_event: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "production_event",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  set: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "production_event",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: undefined },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
  entity_type: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
    },
    {
      id: "production_event",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: undefined },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
    },
  ],
};

export default markerMap;
