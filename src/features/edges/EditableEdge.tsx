import { useReactFlow, type Edge, type EdgeProps } from "@xyflow/react";

import { ControlPoint } from "./ControlPoint";
import { Algorithm } from "./constants";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useEditableEdge } from "./useEditableEdge";
import type { ControlPoint as ControlPointType } from "./edges.types";
import InteractiveBaseEdge from "./InteractiveBaseEdge";
import uuid from "../../shared/utils/uuid";
import { useEffect } from "react";

export type EditableEdge = Edge<{
  algorithm?: Algorithm;
  points: ControlPointType[];
}>;

export function EditableEdgeComponent({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style,
  data = { points: [] },
}: EdgeProps<EditableEdge>) {
  const color = "var(--color-black)";

  const edgeSegmentsArray = useEditableEdge({
    controlPoints: data.points,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const setEdges = useDEMOModeler((state) => state.setEdges);
  const { screenToFlowPosition } = useReactFlow();

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
            setControlPoints((points) => [
              ...points,
              { id: uuid(), ...position, activeEdge: index },
            ]);
          }}
          key={`edge${id}_segment${index}`}
          path={path}
          style={style}
        />
      ))}
      {data.points.map(({ id, x, y, activeEdge }, index) => (
        <ControlPoint
          setControlPoints={setControlPoints}
          id={id}
          color={color}
          key={`edge${id}_handler${index}`}
          activeEdge={activeEdge}
          x={x}
          y={y}
        />
      ))}
    </>
  );
}
