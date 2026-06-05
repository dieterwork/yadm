import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ObjectFactDiagramEdge as ObjectFactDiagramEdgeType } from "../edges.types";

const ObjectFactDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<ObjectFactDiagramEdgeType>) => {
  return (
    <EditableEdgeComponent
      {...restProps}
      centerX={data?.center?.x}
      centerY={data?.center?.y}
      isDraggable={data?.center?.active}
      markerMid={data?.markerMid}
      style={{
        stroke: "var(--color-slate-900)",
        strokeWidth: 2,
        strokeDasharray: data?.lineType === "solid" ? "0" : "5",
      }}
      actions={[
        "swapConnection",
        "resetEdgeCenter",
        "changeLinePath",
        "changeLineType",
      ]}
      linePath={data?.linePath}
    />
  );
};

export default ObjectFactDiagramEdge;
