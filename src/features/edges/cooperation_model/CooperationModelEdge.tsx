import { useInternalNode, type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";

const CooperationModelEdge = ({ ...restProps }: EdgeProps<EditableEdge>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      type="cooperation_model_edge"
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
      actions={["delete", "swapConnection", "toggleProductionEvent"]}
    />
  );
};

export default CooperationModelEdge;
