import { EdgeLabelRenderer, type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ObjectFactDiagramEdge as ObjectFactDiagramEdgeType } from "../edges.types";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const ObjectFactDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<ObjectFactDiagramEdgeType>) => {
  const sourceNode = getNode(restProps.source);
  const targetNode = getNode(restProps.target);
  const markerType = getMarkerType(
    sourceNode?.type,
    targetNode?.type,
    "default",
  );
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
        "changeLaw",
        "changeDerivation",
      ].concat(
        markerType.markerStart ? ["toggleMarkerStart"] : [],
        markerType.markerMid ? ["toggleMarkerMid"] : [],
        markerType.markerEnd ? ["toggleMarkerEnd"] : [],
      )}
      linePath={data?.linePath}
      law={data?.law}
      cardinality={data?.cardinality}
    />
  );
};

export default ObjectFactDiagramEdge;
