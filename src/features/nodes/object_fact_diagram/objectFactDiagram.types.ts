import type { SetNode } from "./set/set.types";
import type { ProductionEventNode } from "./production_event/productionEvent.types";
import type { EntityTypeNode } from "./entity_type/entityType.types";

export type ObjectFactDiagramNode =
  | EntityTypeNode
  | SetNode
  | ProductionEventNode;
