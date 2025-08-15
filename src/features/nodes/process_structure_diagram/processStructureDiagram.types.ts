import type { DerivedEntityNode } from "./derived_entity/derivedEntity.types";
import type { EntityClassNode } from "./entity_class/entityClass.types";
import type { ProductionEventNode } from "./production_event/productionEvent.types";

export type ProcessStructureDiagramNode =
  | DerivedEntityNode
  | EntityClassNode
  | ProductionEventNode;
