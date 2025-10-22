import {
  getEdgeCenter,
  getSmoothStepPath,
  MarkerType,
  useInternalNode,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type XYPosition,
} from "@xyflow/react";

import type { CenterData, DEMOEdge } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../edge_toolbar/DEMOEdgeToolbar";
import { useEffect, useState, type CSSProperties } from "react";
import DoubleArrowMarker from "$/shared/components/ui/markers/DoubleArrowMarker";
import InteractiveCenterEdge from "./InteractiveCenterEdge";
import {
  getEdge,
  updateEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import { getCenterEdgePoints, handleDirections } from "../utils/smoothStep";
import getInteractiveCenterEdgeDirection from "../utils/getInteractiveCenterEdgeDirection";
import clamp from "$/shared/utils/clamp";
import getArrowDirection from "../utils/getArrowDirection";

export type EditableEdge = Edge<{
  center: CenterData;
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
    center: { x: centerX, y: centerY },
    offset,
    stepPosition,
  });

  if (Array.isArray(actions)) {
    actions =
      targetNode.type === "ghost"
        ? actions.filter((action) => action !== "swapConnection")
        : actions;
  }

  const sourceDir = handleDirections[sourcePosition];
  const targetDir = handleDirections[targetPosition];
  const sourceGapped: XYPosition = {
    x: sourceX + sourceDir.x * offset,
    y: sourceY + sourceDir.y * offset,
  };
  const targetGapped: XYPosition = {
    x: targetX + targetDir.x * offset,
    y: targetY + targetDir.y * offset,
  };

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

  const interactiveEdgeDirection = getInteractiveCenterEdgeDirection({
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
    offset,
  });

  const arrowDirection = getArrowDirection({
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
    offset,
  });

  // useEffect(() => {
  //   console.log(arrowDirection);
  // }, [arrowDirection]);

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
        direction={interactiveEdgeDirection}
        onDragStart={({ event }) => {
          event.stopPropagation();
          updateEdgeData(id, (data) => ({
            ...data,
            center:
              data && "center" in data
                ? { ...data.center, active: true }
                : undefined,
          }));
          updateEdge(id, (edge) => ({
            ...edge,
            selectable: false,
            selected: false,
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
            center:
              data && "center" in data
                ? {
                    ...data.center,
                    x:
                      interactiveEdgeDirection === "horizontal"
                        ? position.x
                        : data.center?.x,
                    y:
                      interactiveEdgeDirection === "vertical"
                        ? position.y
                        : data.center?.y,
                  }
                : undefined,
          }));
        }}
        onDragEnd={({ event }) => {
          event.stopPropagation();
          updateEdgeData(id, (data) => ({
            ...data,
            center:
              data && "center" in data
                ? { ...data.center, active: true }
                : undefined,
          }));
          updateEdge(id, (edge) => ({
            ...edge,
            selectable: true,
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
      {/* {markerMid && (
        <DoubleArrowMarker
          labelX={labelX}
          labelY={labelY}
          direction={getArrowDirection({
            source: { x: sourceX, y: sourceY },
            sourcePosition,
            target: { x: targetX, y: targetY },
          })}
        />
      )} */}
    </>
  );
}
