import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { CooperationModelEdge as CooperationModelEdgeType } from "../edges.types";

const CooperationModelEdge = ({
  data,
  ...restProps
}: EdgeProps<CooperationModelEdgeType>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      type="cooperation_model_edge"
      actions={[
        "delete",
        "swapConnection",
        "toggleProductionEvent",
        "changeLineType",
      ]}
      style={{ strokeDasharray: data?.lineType === "solid" ? "0" : "5" }}
    />
  );
};

export default CooperationModelEdge;
