import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { CooperationModelEdge as CooperationModelEdgeType } from "../edges.types";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const CooperationModelEdge = ({
  data,
  ...restProps
}: EdgeProps<CooperationModelEdgeType>) => {
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
      type="cooperation_model_edge"
      centerX={data?.center?.x}
      centerY={data?.center?.y}
      isDraggable={data?.center?.active}
      actions={[
        "swapConnection",
        "toggleProductionEvent",
        "changeLineType",
        "changeLinePath",
      ].concat(
        markerType.markerStart ? ["toggleMarkerStart"] : [],
        markerType.markerMid ? ["toggleMarkerMid"] : [],
        markerType.markerEnd ? ["toggleMarkerEnd"] : [],
      )}
      style={{ strokeDasharray: data?.lineType === "solid" ? "0" : "5" }}
      linePath={data?.linePath}
    />
  );
};

export default CooperationModelEdge;
