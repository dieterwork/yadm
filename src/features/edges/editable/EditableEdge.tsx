import {
  BaseEdge,
  getEdgeCenter,
  getSmoothStepPath,
  MarkerType,
  useInternalNode,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import type { ControlPointData } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";

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
  ...restProps
}: EdgeProps<EditableEdge>) {
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const [path] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={path}
      strokeWidth={5}
      markerEnd={MarkerType.Arrow}
      style={style}
    />
  );
}
