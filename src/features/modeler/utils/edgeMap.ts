import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode, SubModel } from "$/features/nodes/nodes.types";

// Todo make an object
const edgeMap: Partial<
  Record<DEMONode["type"], { id: DEMONode["type"]; type: DEMOEdge["type"] }[]>
> = {
  // cooperation model
  actor: [
    { id: "actor", type: "cooperation_model_edge" },
    { id: "transaction", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "elementary_actor", type: "cooperation_model_edge" },
    { id: "several_actors", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  transaction: [
    { id: "actor", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "elementary_actor", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  transactor: [
    { id: "transaction", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "elementary_actor", type: "cooperation_model_edge" },
    { id: "several_actors", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  self_activation: [
    { id: "actor", type: "cooperation_model_edge" },
    { id: "transaction", type: "cooperation_model_edge" },
    { id: "transactor", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "elementary_actor", type: "cooperation_model_edge" },
    { id: "several_actors", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  composite: [
    { id: "actor", type: "cooperation_model_edge" },
    { id: "transaction", type: "cooperation_model_edge" },
    { id: "transactor", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "elementary_actor", type: "cooperation_model_edge" },
    { id: "several_actors", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  elementary_actor: [
    { id: "transaction", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  several_actors: [
    { id: "actor", type: "cooperation_model_edge" },
    { id: "self_activation", type: "cooperation_model_edge" },
    { id: "composite", type: "cooperation_model_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  // ofd
  transaction_time: [
    { id: "transaction_time", type: "transaction_time_edge" },
    { id: "initiation_fact", type: "transaction_time_edge" },
    { id: "c_fact", type: "transaction_time_edge" },
    { id: "c_act", type: "transaction_time_edge" },
    { id: "tk_execution", type: "transaction_time_edge" },
    { id: "ghost", type: "transaction_time_edge" },
  ],
  initiation_fact: [
    { id: "initiation_fact", type: "object_fact_diagram_edge" },
    { id: "c_fact", type: "object_fact_diagram_edge" },
    { id: "c_act", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  c_fact: [
    { id: "initiation_fact", type: "object_fact_diagram_edge" },
    { id: "c_fact", type: "object_fact_diagram_edge" },
    { id: "c_act", type: "object_fact_diagram_edge" },
    { id: "tk_execution", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  c_act: [
    { id: "initiation_fact", type: "object_fact_diagram_edge" },
    { id: "c_fact", type: "object_fact_diagram_edge" },
    { id: "tk_execution", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  tk_execution: [
    { id: "c_fact", type: "object_fact_diagram_edge" },
    { id: "c_act", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  // ofd
  production_event: [
    { id: "entity_class", type: "object_fact_diagram_edge" },
    { id: "derived_entity", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  entity_class: [
    { id: "entity_class", type: "object_fact_diagram_edge" },
    { id: "derived_entity", type: "object_fact_diagram_edge" },
    { id: "production_event", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
  derived_entity: [
    { id: "entity_class", type: "object_fact_diagram_edge" },
    { id: "derived_entity", type: "object_fact_diagram_edge" },
    { id: "production_event", type: "object_fact_diagram_edge" },
    { id: "ghost", type: "ghost_edge" },
  ],
};

export default edgeMap;
