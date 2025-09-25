import { useInternalNode, type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";
import EdgeToolbar from "../edge_toolbar/DEMOEdgeToolbar";
import type { DEMONode } from "$/features/nodes/nodes.types";

const CooperationModelEdge = ({ ...restProps }: EdgeProps<EditableEdge>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      type="cooperation_model_edge"
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
    />
  );
};

export default CooperationModelEdge;
