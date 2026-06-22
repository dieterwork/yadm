import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ProcessStructureDiagramEdge as ProcessStructureDiagramEdgeType } from "../edges.types";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const ProcessStructureDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<ProcessStructureDiagramEdgeType>) => {
  const sourceNode = getNode(restProps.source);
  const targetNode = getNode(restProps.target);
  const markerType = getMarkerType(
    sourceNode?.type,
    targetNode?.type,
    "default",
  );
  return (
    <>
      <EditableEdgeComponent
        {...restProps}
        centerX={data?.center?.x}
        centerY={data?.center?.y}
        isDraggable={data?.center?.active}
        style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
        actions={["swapConnection", "resetEdgeCenter", "changeLinePath"].concat(
          markerType.markerStart ? ["toggleMarkerStart"] : [],
          markerType.markerMid ? ["toggleMarkerMid"] : [],
          markerType.markerEnd ? ["toggleMarkerEnd"] : [],
        )}
        linePath={data?.linePath}
      />
    </>
  );
};

export default ProcessStructureDiagramEdge;
