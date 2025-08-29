export const X_SMALL_NODE_SIZE = 25;
export const SMALL_NODE_SIZE = 50;
export const MEDIUM_NODE_SIZE = 100;
export const LARGE_NODE_SIZE = 200;

const TRANSACTION_TIME_SIZE = 300;

const TRANSACTION_TIME_MIN_SIZE = 100;

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

  text_node: {
    width: 150,
    height: 100,
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

  text_node: {
    width: 20,
    height: 20,
  },
};

export const DEFAULT_CONTENT_MAP = {
  // cooperation model
  actor: "<div>Actor</div><div>A</div>",
  transaction: "<div>01</div>",
  transactor: "<div>01</div>",
  self_activation: "<div>01</div>",
  composite: "<div>CT</div><div>Client</div>",
  elementary_actor: "<div>01</div>",
  several_actors: "<div>01</div>",
  // transaction pattern diagram
  transaction_kind: "<div>A1</div>",
  initiation_fact: "<div>A</div><div>1</div>",
  c_fact: "<div>A</div><div>1</div>",
  c_act: "<div>A</div><div>1</div>",
  tk_execution: "<div>A</div><div>1</div>",
  // object fact diagram
  production_event: "<div>01</div>",
  entity_class: "<div>A</div><div>1</div>",
  derived_entity: "<div>A</div><div>1</div>",
  text_node: "<div>Insert text here</div>",
  textNode: "<div>Insert text here</div>",
};
