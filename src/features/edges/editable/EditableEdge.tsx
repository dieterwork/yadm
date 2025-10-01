import {
  BaseEdge,
  getEdgeCenter,
  getSmoothStepPath,
  MarkerType,
  useInternalNode,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import type { ControlPointData, DEMOEdge } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";
import EdgeToolbar from "../edge_toolbar/EdgeToolbar";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../edge_toolbar/DEMOEdgeToolbar";
import type { CSSProperties } from "react";

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
  data,
  markerEnd,
  markerStart,
  markerMid,
  selected,
  type,
  actions,
  style,
  ...restProps
}: EdgeProps<EditableEdge> & {
  markerMid?: string;
  type?: DEMOEdge["type"];
  actions?: EdgeToolbarAction[];
  style?: CSSProperties;
}) {
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
        markerMid={markerMid}
      />
      {selected && (
        <DEMOEdgeToolbar
          edgeId={id}
          position={{ x: labelX, y: labelY }}
          sourceNodeId={sourceNode.id}
          targetNodeId={targetNode.id}
          actions={actions}
        />
      )}
    </>
  );
}
