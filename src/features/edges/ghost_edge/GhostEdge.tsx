import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";

const GhostEdge = ({ data, ...restProps }: EdgeProps<EditableEdge>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      centerX={data?.center?.x}
      centerY={data?.center?.y}
      isDraggable={data?.center?.active}
      type="ghost_edge"
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
    />
  );
};

export default GhostEdge;
