import {
  getEdgeCenter,
  getSmoothStepPath,
  MarkerType,
  Position,
  useInternalNode,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type InternalNode,
} from "@xyflow/react";

import type { ControlPointData, DEMOEdge } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../edge_toolbar/DEMOEdgeToolbar";
import type { CSSProperties } from "react";
import DoubleArrowMarker from "$/shared/components/ui/markers/DoubleArrowMarker";

export type EditableEdge = Edge<{
  controlPoint: ControlPointData;
}>;

export function EditableEdgeComponent({
  id,
  sourceX,
  sourceY,
  source,
  sourcePosition,
  targetX,
  targetY,
  target,
  targetPosition,
  markerEnd,
  markerStart,
  markerMid,
  selected,
  actions,
  style,
  sourceHandleId,
  targetHandleId,
}: EdgeProps<EditableEdge> & {
  markerMid?: MarkerType;
  type?: DEMOEdge["type"];
  actions?: EdgeToolbarAction[];
  style?: CSSProperties;
}) {
  console.log(markerMid);
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition,
  });

  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  if (Array.isArray(actions)) {
    actions =
      targetNode.type === "ghost"
        ? actions.filter((action) => action !== "swapConnection")
        : actions;
  }

  return (
    <>
      <path
        style={{ ...style, strokeWidth: 2, stroke: "var(--color-slate-900)" }}
        id={id}
        className="react-flow__edge-path"
        d={path}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      {selected && (
        <DEMOEdgeToolbar
          edgeId={id}
          position={{ x: labelX, y: labelY }}
          actions={actions}
        />
      )}
      {markerMid && <DoubleArrowMarker labelX={labelX} labelY={labelY} />}
    </>
  );
}
