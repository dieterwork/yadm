import ActorShape from "../nodes/cooperation_structure_diagram/actor/ActorShape";
import CompositeShape from "../nodes/cooperation_structure_diagram/composite/CompositeShape";
import TransactionShape from "../nodes/cooperation_structure_diagram/transaction/TransactionShape";
import CActShape from "../nodes/process_structure_diagram/c_act/CActShape";
import CFactShape from "../nodes/process_structure_diagram/c_fact/CFactShape";
import InitiationFactShape from "../nodes/process_structure_diagram/initiation_fact/InitiationFactShape";
import TKExecutionShape from "../nodes/process_structure_diagram/tk_execution/TKExecutionShape";
import TransactionKindShape from "../nodes/process_structure_diagram/transaction_kind/TransactionKindShape";
import TransactionTimeShape from "../nodes/process_structure_diagram/transaction_time/TransactionTimeShape";
import OrganizationShape from "../nodes/organization/OrganizationShape";
import EntityTypeShape from "../nodes/object_fact_diagram/entity_type/EntityTypeShape";
import ProductionEventShape from "../nodes/object_fact_diagram/production_event/ProductionEventShape";
import AttributeNodeShape from "../nodes/object_fact_diagram/attribute/AttributeNodeShape";
import MultipleTransactionKindShape from "../nodes/cooperation_structure_diagram/multiple_transaction_kind/MultipleTransactionKindShape";

export const shapeMap = {
  // cooperation model
  actor: ActorShape,
  transaction: TransactionShape,
  composite: CompositeShape,
  multiple_transaction_kind: MultipleTransactionKindShape,
  // transaction pattern diagram
  transaction_time: TransactionTimeShape,
  transaction_kind: TransactionKindShape,
  initiation_fact: InitiationFactShape,
  c_fact: CFactShape,
  c_act: CActShape,
  tk_execution: TKExecutionShape,
  // object fact diagram
  production_event: ProductionEventShape,
  entity_type: EntityTypeShape,
  attribute: AttributeNodeShape,
  organization: OrganizationShape,
};
