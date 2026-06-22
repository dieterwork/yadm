import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const GhostEdge = ({ data, ...restProps }: EdgeProps<EditableEdge>) => {
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
      centerX={data?.center?.x}
      centerY={data?.center?.y}
      isDraggable={data?.center?.active}
      type="ghost_edge"
      actions={["changeLinePath"].concat(
        markerType.markerStart ? ["toggleMarkerStart"] : [],
        markerType.markerMid ? ["toggleMarkerMid"] : [],
        markerType.markerEnd ? ["toggleMarkerEnd"] : [],
      )}
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
      linePath={data?.linePath}
    />
  );
};

export default GhostEdge;
