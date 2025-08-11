export const X_SMALL_NODE_SIZE = 25;
export const SMALL_NODE_SIZE = 50;
export const MEDIUM_NODE_SIZE = 100;
export const LARGE_NODE_SIZE = 200;

const TRANSACTION_TIME_INNER_SIZE = 300;
const TRANSACTION_TIME_OFFSET = 100;

const TRANSACTION_TIME_INNER_MIN_SIZE = 100;
const TRANSACTION_TIME_MIN_OFFSET = 50;

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
    height: 225,
  },
  several_actors: {
    width: 200,
    height: 225,
  },

  // transaction pattern diagram
  transaction_time: {
    width:
      TRANSACTION_TIME_INNER_SIZE + X_SMALL_NODE_SIZE + TRANSACTION_TIME_OFFSET,
    height: SMALL_NODE_SIZE + X_SMALL_NODE_SIZE,
  },
  transaction_time_inner: {
    width: TRANSACTION_TIME_INNER_SIZE + X_SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE + X_SMALL_NODE_SIZE,
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
};

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
    width:
      TRANSACTION_TIME_INNER_MIN_SIZE +
      X_SMALL_NODE_SIZE +
      TRANSACTION_TIME_MIN_OFFSET,
    height: SMALL_NODE_SIZE + X_SMALL_NODE_SIZE,
  },
  transaction_time_inner: {
    width: TRANSACTION_TIME_INNER_MIN_SIZE + X_SMALL_NODE_SIZE,
    height: SMALL_NODE_SIZE + X_SMALL_NODE_SIZE,
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
};

export const DEFAULT_CONTENT_MAP = {
  // cooperation model
  actor: ["A", "1"],
  transaction: ["T", "1"],
  transactor: ["T", "1"],
  self_activation: ["T", "1"],
  composite: ["T", "1"],
  elementary_actor: ["T", "1"],
  several_actors: ["T", "1"],
  // transaction pattern diagram
  transaction_time: [],
  transaction_kind: ["T"],
  initiation_fact: [],
  c_fact: [],
  c_act: [],
  tk_execution: [],
  // object fact diagram
  production_event: "01",
  entity_class: ["T", "1"],
  derived_entity: ["T", "1"],
};
