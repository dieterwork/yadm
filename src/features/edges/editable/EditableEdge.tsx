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
  type XYPosition,
} from "@xyflow/react";

import type { ControlPointData, DEMOEdge } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../edge_toolbar/DEMOEdgeToolbar";
import { useState, type CSSProperties } from "react";
import DoubleArrowMarker from "$/shared/components/ui/markers/DoubleArrowMarker";
import InteractiveCenterEdge from "./InteractiveCenterEdge";
import {
  updateEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import { getArrowDirection, getCenterEdgePoints } from "../utils/smoothStep";

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
  isDraggable,
  markerEnd,
  markerStart,
  markerMid,
  centerX,
  centerY,
  selected,
  actions,
  style,
}: EdgeProps<EditableEdge> & {
  markerMid?: MarkerType;
  type?: DEMOEdge["type"];
  actions?: EdgeToolbarAction[];
  style?: CSSProperties;
  centerX?: number;
  centerY?: number;
  isDraggable?: boolean;
}) {
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const { screenToFlowPosition } = useReactFlow();

  const offset = 20;
  const stepPosition = 0.5;

  const [centerEdgeX, centerEdgeY] =
    !centerX || !centerY
      ? getEdgeCenter({
          sourceX,
          sourceY,
          targetX,
          targetY,
        })
      : [centerX, centerY];

  const [sourceCenterPosition, targetCenterPosition] = getCenterEdgePoints({
    source: {
      x: sourceX,
      y: sourceY,
    },
    sourcePosition,
    target: {
      x: targetX,
      y: targetY,
    },
    targetPosition,
    center: { x: centerEdgeX, y: centerEdgeY },
    offset,
    stepPosition,
  });

  if (Array.isArray(actions)) {
    actions =
      targetNode.type === "ghost"
        ? actions.filter((action) => action !== "swapConnection")
        : actions;
  }

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    targetX: targetX,
    targetY: targetY,
    sourcePosition: sourcePosition,
    targetPosition: targetPosition,
    centerX,
    centerY,
    offset,
    stepPosition,
  });

  return (
    <>
      <path
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "var(--color-slate-900)",
          fill: "transparent",
        }}
        id={id}
        className="react-flow__edge-path"
        d={path}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      <InteractiveCenterEdge
        sourceX={sourceCenterPosition?.x ?? 0}
        targetX={targetCenterPosition?.x ?? 0}
        sourceY={sourceCenterPosition?.y ?? 0}
        targetY={targetCenterPosition?.y ?? 0}
        active={isDraggable}
        onDragStart={({ event }) => {
          event.stopPropagation();
          updateEdgeData(id, (data) => ({
            ...data,
            center: { ...data.center, active: true },
          }));
        }}
        onDrag={({ xy, event }) => {
          event.stopPropagation();
          const position = screenToFlowPosition({
            x: xy[0],
            y: xy[1],
          });
          updateEdgeData(id, (data) => ({
            ...data,
            center: { ...data.center, ...position },
          }));
        }}
        onDragEnd={({ event }) => {
          event.stopPropagation();
          updateEdgeData(id, (data) => ({
            ...data,
            center: { ...data.center, active: false },
          }));
        }}
      />
      {selected && (
        <DEMOEdgeToolbar
          edgeId={id}
          position={{ x: labelX, y: labelY }}
          actions={actions}
        />
      )}
      {markerMid && (
        <DoubleArrowMarker
          labelX={labelX}
          labelY={labelY}
          direction={getArrowDirection({
            source: { x: sourceX, y: sourceY },
            sourcePosition,
            target: { x: targetX, y: targetY },
          })}
        />
      )}
    </>
  );
}
