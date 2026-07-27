import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { CooperationStructureDiagramEdge as CooperationStructureDiagramEdgeType } from "../edges.types";

const CooperationStructureDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<CooperationStructureDiagramEdgeType>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      type="cooperation_structure_diagram_edge"
      centerX={data?.center?.x}
      centerY={data?.center?.y}
      isDraggable={data?.center?.active}
      actions={[
        "swapConnection",
        "toggleProductionEvent",
        "changeLineType",
        "changeLinePath",
        "changeMarker",
      ]}
      style={{ strokeDasharray: data?.lineType === "solid" ? "0" : "5" }}
      linePath={data?.linePath}
    />
  );
};

export default CooperationStructureDiagramEdge;
