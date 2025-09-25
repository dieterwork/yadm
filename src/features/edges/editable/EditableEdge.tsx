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
import DEMOEdgeToolbar from "../edge_toolbar/DEMOEdgeToolbar";

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
  style,
  data,
  markerEnd,
  markerStart,
  markerMid,
  selected,
  type,
}: EdgeProps<EditableEdge> & { markerMid?: string; type?: DEMOEdge["type"] }) {
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

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        strokeWidth={5}
        markerEnd={markerEnd}
        markerStart={markerStart}
        markerMid={markerMid}
        style={style}
      />
      {selected && (
        <DEMOEdgeToolbar
          id={id}
          data={data}
          type={type}
          selected={selected}
          position={{ x: labelX, y: labelY }}
        />
      )}
    </>
  );
}
