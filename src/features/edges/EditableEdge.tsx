import {
  BaseEdge,
  getEdgeCenter,
  getSmoothStepPath,
  Position,
  useInternalNode,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import { ControlPoint } from "./ControlPoint";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import type { ControlPointData } from "./edges.types";
import { type DEMONode } from "../nodes/nodes.types";

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
}: EdgeProps<EditableEdge>) {
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const setEdges = useDEMOModeler((state) => state.setEdges);

  const controlPoint: ControlPointData = data?.controlPoint
    ? data.controlPoint
    : {
        x: 0,
        y: 0,
        active: true,
      };

  const setControlPoint = (
    update: (point: ControlPointData) => ControlPointData
  ) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id !== id) return edge;

        const _controlPoint = edge.data?.controlPoint ?? controlPoint;

        const newControlPoint = update(_controlPoint);

        const data = {
          ...edge.data,
          controlPoint: newControlPoint,
        };

        return { ...edge, data };
      })
    );
  };

  const [centerX, centerY] = getEdgeCenter({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
  });

  const [path] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition,
    centerX: centerX - controlPoint.x,
    centerY: centerY - controlPoint.y,
  });

  return (
    <>
      <BaseEdge path={path} style={style} />
      <ControlPoint
        setControlPoint={setControlPoint}
        color="var(--color-black)"
        active={controlPoint.active}
        x={centerX - controlPoint.x}
        y={centerY - controlPoint.y}
      />
    </>
  );
}
