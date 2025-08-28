import {
  useInternalNode,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import { ControlPoint } from "./ControlPoint";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useEditableEdge } from "./useEditableEdge";
import type { ControlPoint as ControlPointType } from "./edges.types";
import InteractiveBaseEdge from "./InteractiveBaseEdge";
import uuid from "../../shared/utils/uuid";
import { getEdgeParams } from "./edges.utils";

export type EditableEdge = Edge<{
  points: ControlPointType[];
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
  data = { points: [] },
}: EdgeProps<EditableEdge>) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const setEdges = useDEMOModeler((state) => state.setEdges);
  const { screenToFlowPosition } = useReactFlow();
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  const edgeSegmentsArray = useEditableEdge({
    controlPoints: data.points,
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  if (!sourceNode || !targetNode) {
    return null;
  }

  const color = "var(--color-black)";

  const setControlPoints = (
    update: (points: ControlPointType[]) => ControlPointType[]
  ) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id !== id) return edge;

        const points = edge.data?.points ?? [];
        const data = { ...edge.data, points: update(points) };

        return { ...edge, data };
      })
    );
  };

  return (
    <>
      {edgeSegmentsArray.map(({ path, labelX, labelY }, index) => (
        <InteractiveBaseEdge
          onPointerDown={(e) => {
            const position = screenToFlowPosition({
              x: e.clientX,
              y: e.clientY,
            });
            setControlPoints((points) =>
              points
                .map((point) => ({ ...point, active: false }))
                .concat([
                  { id: uuid(), x: position.x, y: position.y, active: true },
                ])
            );
          }}
          key={`edge${id}_segment${index}`}
          path={path}
          style={style}
        />
      ))}
      {data.points.map(({ id, x, y, active }, index) => (
        <ControlPoint
          setControlPoints={setControlPoints}
          id={id}
          color={color}
          key={`edge${id}_handler${index}`}
          active={active}
          x={x}
          y={y}
        />
      ))}
    </>
  );
}
