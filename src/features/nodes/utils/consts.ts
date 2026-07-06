import { calculateDoubleDiamondInCircleDimensions } from "$/features/shapes/utils/calculateDoubleDiamondInCircleDimensions";
import type { DEMONode, DEMONodeContent } from "../nodes.types";

export const X_SMALL_NODE_SIZE = 30 as const;
export const SMALL_NODE_SIZE = 60 as const;
export const MEDIUM_NODE_SIZE = 100 as const;
export const LARGE_NODE_SIZE = 200 as const;
export const TRANSACTION_TIME_HEIGHT = SMALL_NODE_SIZE;
export const TRANSACTION_TIME_WIDTH = 300 as const;
export const TRANSACTION_TIME_MIN_SIZE = 100 as const;

const doubleDiamondInCircleDimensions =
  calculateDoubleDiamondInCircleDimensions(MEDIUM_NODE_SIZE);

export const DEFAULT_SIZE_MAP = {
  actor: {
    width: 100,
    height: 100,
  },
  transaction: {
    width: 100,
    height: 100,
  },
  transactor: {
    width: 200,
    height: 300,
  },
  self_activation: {
    width: 200,
    height: 200,
  },
  composite: {
    width: 200,
    height: 200,
  },
  elementary_actor: {
    width: 200,
    height: 300,
  },
  several_actors: {
    width: 200,
    height: 300,
  },
  multiple_transaction_kind: {
    width: doubleDiamondInCircleDimensions.width + 4,
    height: MEDIUM_NODE_SIZE,
  },
  organization: {
    width: 200,
    height: 200,
  },

  // transaction pattern diagram
  transaction_time: {
    width: TRANSACTION_TIME_WIDTH,
    height: TRANSACTION_TIME_HEIGHT,
  },
  transaction_kind: {
    width: SMALL_NODE_SIZE - 4,
    height: SMALL_NODE_SIZE - 4,
  },
  initiation_fact: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  c_fact: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  c_act: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  tk_execution: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },

  // object fact diagram
  production_event: {
    width: SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE,
  },
  set: {
    width: 100,
    height: 200,
  },
  entity_type: {
    width: 100,
    height: 200,
  },
  attribute: {
    width: 100,
    height: 100,
  },

  // misc

  text: {
    width: 150,
    height: 100,
  },
  ghost: null,
} satisfies Record<DEMONode["type"], { width: number; height: number } | null>;

export const MIN_SIZE_MAP = {
  actor: {
    width: 100,
    height: 100,
  },
  transaction: {
    width: 100,
    height: 100,
  },
  multiple_transaction_kind: {
    width: doubleDiamondInCircleDimensions.width + 4,
    height: MEDIUM_NODE_SIZE,
  },
  transactor: {
    width: 200,
    height: 200,
  },
  self_activation: {
    width: 200,
    height: 200,
  },
  composite: {
    width: 100,
    height: 100,
  },
  elementary_actor: {
    width: 200,
    height: 175,
  },
  several_actors: {
    width: 200,
    height: 175,
  },

  // transaction pattern diagram
  transaction_time: {
    width: TRANSACTION_TIME_MIN_SIZE,
    height: TRANSACTION_TIME_HEIGHT,
  },
  transaction_kind: {
    width: SMALL_NODE_SIZE - 4,
    height: SMALL_NODE_SIZE - 4,
  },
  initiation_fact: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  c_fact: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  c_act: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },
  tk_execution: {
    width: X_SMALL_NODE_SIZE,
    height: X_SMALL_NODE_SIZE,
  },

  // object fact diagram
  production_event: {
    width: SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE,
  },
  set: {
    width: 100,
    height: 100,
  },
  entity_type: {
    width: 100,
    height: 100,
  },

  // misc
  text: {
    width: 20,
    height: 20,
  },
  ghost: null,
  organization: {
    width: 100,
    height: 100,
  },
} satisfies Record<DEMONode["type"], { width: number; height: number } | null>;

export const DEFAULT_CONTENT_MAP = {
  // cooperation model
  actor: {
    body: "A",
  },
  transaction: {
    body: "01",
  },
  transactor: {
    body: "A",
  },
  self_activation: {
    header: "A1",
    body: "A2",
  },
  composite: {
    body: "CT",
  },
  elementary_actor: {
    body: "01",
  },
  several_actors: {
    body: "01",
  },
  // transaction pattern diagram
  transaction_kind: {
    body: "A",
  },
  initiation_fact: {
    body: "A",
  },
  c_act: {
    body: "A",
  },
  c_fact: {
    body: "A",
  },
  tk_execution: {
    body: "A",
  },
  // object fact diagram
  production_event: {
    body: "A",
  },
  set: {
    body: "A",
  },
  entity_type: {
    body: "A",
  },
  attribute: {
    header: "Entity Type",
    body: "Group [value type]",
  },
  // misc
  text: {
    body: "Insert text here",
  },
  transaction_time: null,
  ghost: null,
  organization: {
    body: "",
  },
  multiple_transaction_kind: {
    body: "A",
  },
} satisfies Record<DEMONode["type"], Partial<DEMONodeContent> | null>;
