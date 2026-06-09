import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ObjectFactDiagramEdge as ObjectFactDiagramEdgeType } from "../edges.types";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";

const ObjectFactDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<ObjectFactDiagramEdgeType>) => {
  const sourceNode = getNode(restProps.source);
  const targetNode = getNode(restProps.target);
  return (
    <EditableEdgeComponent
      {...restProps}
      source={restProps.source}
      target={restProps.target}
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
      ].concat(
        sourceNode?.type === "production_event" &&
          targetNode?.type === "production_event"
          ? ["toggleMarkerEnd"]
          : [],
      )}
      linePath={data?.linePath}
    />
  );
};

export default ObjectFactDiagramEdge;
