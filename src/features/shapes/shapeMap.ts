import ActorShape from "../nodes/cooperation_model/actor/ActorShape";
import CompositeShape from "../nodes/cooperation_model/composite/CompositeShape";
import ElementaryActorShape from "../nodes/cooperation_model/elementary_actor/ElementaryActorShape";
import SelfActivationShape from "../nodes/cooperation_model/self_activation/SelfActivationShape";
import SeveralActorsShape from "../nodes/cooperation_model/several_actors/SeveralActorsShape";
import TransactionShape from "../nodes/cooperation_model/transaction/TransactionShape";
import TransactorShape from "../nodes/cooperation_model/transactor/TransactorShape";
import CActShape from "../nodes/object_fact_diagram/c_act/CActShape";
import CFactShape from "../nodes/object_fact_diagram/c_fact/CFactShape";
import InitiationFactShape from "../nodes/object_fact_diagram/initiation_fact/InitiationFactShape";
import TKExecutionShape from "../nodes/object_fact_diagram/tk_execution/TKExecutionShape";
import TransactionKindShape from "../nodes/object_fact_diagram/transaction_kind/TransactionKindShape";
import TransactionTimeInnerShape from "../nodes/object_fact_diagram/transaction_time_inner/TransactionTimeInnerShape";
import DerivedEntityShape from "../nodes/process_structure_diagram/derived_entity/DerivedEntityShape";
import EntityClassShape from "../nodes/process_structure_diagram/entity_class/EntityClassShape";
import ProductionEventShape from "../nodes/process_structure_diagram/production_event/ProductionEventShape";
import TransactionTimeShape from "../nodes/object_fact_diagram/transaction_time/TransactionTimeShape";

export const shapeMap = {
  // cooperation model
  actor: ActorShape,
  transaction: TransactionShape,
  transactor: TransactorShape,
  self_activation: SelfActivationShape,
  composite: CompositeShape,
  elementary_actor: ElementaryActorShape,
  several_actors: SeveralActorsShape,
  // transaction pattern diagram
  transaction_time: TransactionTimeShape,
  transaction_time_inner: TransactionTimeInnerShape,
  transaction_kind: TransactionKindShape,
  initiation_fact: InitiationFactShape,
  c_fact: CFactShape,
  c_act: CActShape,
  tk_execution: TKExecutionShape,
  // object fact diagram
  production_event: ProductionEventShape,
  entity_class: EntityClassShape,
  derived_entity: DerivedEntityShape,
};
