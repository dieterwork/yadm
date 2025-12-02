import type { DEMONode } from "../nodes.types";

export const X_SMALL_NODE_SIZE = 25 as const;
export const SMALL_NODE_SIZE = 50 as const;
export const MEDIUM_NODE_SIZE = 100 as const;
export const LARGE_NODE_SIZE = 200 as const;
export const TRANSACTION_TIME_SIZE = 300 as const;
export const TRANSACTION_TIME_MIN_SIZE = 100 as const;

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

  organization: {
    width: 200,
    height: 200,
  },

  // transaction pattern diagram
  transaction_time: {
    width: TRANSACTION_TIME_SIZE,
    height: SMALL_NODE_SIZE,
  },
  transaction_kind: {
    width: SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE,
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
    width: 50,
    height: 50,
  },
  entity_class: {
    width: 100,
    height: 200,
  },
  derived_entity: {
    width: 100,
    height: 200,
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
    height: SMALL_NODE_SIZE,
  },
  transaction_kind: {
    width: SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE,
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
    width: 50,
    height: 50,
  },
  entity_class: {
    width: 100,
    height: 100,
  },
  derived_entity: {
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
  actor: "A",
  transaction: "01",
  transactor: "A",
  self_activation: "A",
  composite: "CT",
  elementary_actor: "01",
  several_actors: "01",
  // transaction pattern diagram
  transaction_kind: "A1",
  initiation_fact: "A",
  c_fact: "A",
  c_act: "A",
  tk_execution: "A",
  // object fact diagram
  production_event: "01",
  entity_class: "A",
  derived_entity: "A",
  text: "<div>Insert text here</div>",
  transaction_time: null,
  ghost: null,
  organization: null,
} satisfies Record<DEMONode["type"], string | null>;
