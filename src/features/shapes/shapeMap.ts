import ActorShape from "../nodes/cooperation_model/actor/ActorShape";
import CompositeCTARShape from "../nodes/cooperation_model/composite-ctar/CompositeCTARShape";
import ElementaryActorCTARShape from "../nodes/cooperation_model/elementary-actor/ElementaryActorCTARShape";
import SelfActivationShape from "../nodes/cooperation_model/self-activation/SelfActivationShape";
import SeveralActorsShape from "../nodes/cooperation_model/several-actors/SeveralActorsShape";
import TransactionShape from "../nodes/cooperation_model/transaction/TransactionShape";
import TransactorShape from "../nodes/cooperation_model/transactor/TransactorShape";

export const shapeMap = {
  actor: ActorShape,
  transaction: TransactionShape,
  transactor: TransactorShape,
  "self-activation": SelfActivationShape,
  "composite-ctar": CompositeCTARShape,
  "elementary-actor": ElementaryActorCTARShape,
  "several-actors": SeveralActorsShape,
};
