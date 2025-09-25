import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";

const GhostEdge = ({ ...restProps }: EdgeProps<EditableEdge>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      type="ghost_edge"
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
    />
  );
};

export default GhostEdge;
