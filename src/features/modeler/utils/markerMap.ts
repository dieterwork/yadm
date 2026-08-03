import type { DEMONode } from "$/features/nodes/nodes.types";
import { type EdgeMarkerType } from "@xyflow/react";
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
      all: {
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
      id: "actor",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "transaction",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "composite",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "multiple_transaction_kind",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: {
        markerEnd: closedMarker,
      },
      initial: {
        markerEnd: closedMarker,
      },
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
  ],
  transaction: [
    {
      id: "actor",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "transaction",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "composite",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "multiple_transaction_kind",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
  ],
  transactor: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  self_activation: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  composite: [
    {
      id: "actor",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "transaction",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "composite",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "multiple_transaction_kind",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
  ],
  elementary_actor: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  several_actors: [
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  multiple_transaction_kind: [
    {
      id: "actor",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "transaction",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "composite",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "multiple_transaction_kind",
      default: {},
      initial: {},
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerStart: closedMarker,
        markerEnd: closedMarker,
      },
    },
  ],
  // ofd
  initiation_fact: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  c_fact: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "tk_execution",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  c_act: [
    {
      id: "initiation_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "tk_execution",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  tk_execution: [
    {
      id: "c_fact",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "c_act",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  production_event: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "attribute",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "production_event",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  set: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "attribute",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "production_event",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: undefined },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  entity_type: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "attribute",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "production_event",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: undefined },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
  attribute: [
    {
      id: "set",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "entity_type",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "attribute",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: "url(#diamond)" },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "production_event",
      default: { markerMid: "url(#diamond)" },
      initial: { markerMid: undefined },
      all: {
        markerEnd: closedMarker,
        markerMid: "url(#diamond)",
      },
    },
    {
      id: "ghost",
      default: { markerEnd: closedMarker },
      initial: { markerEnd: closedMarker },
      all: {
        markerEnd: closedMarker,
      },
    },
  ],
};

export default markerMap;
