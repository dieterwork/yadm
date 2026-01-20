import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  useInternalNode,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import type { CenterData, DEMOEdge, LinePath } from "../edges.types";
import { type DEMONode } from "../../nodes/nodes.types";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../edge_toolbar/DEMOEdgeToolbar";
import { type CSSProperties } from "react";
import DoubleArrowMarker from "$/shared/components/ui/markers/DoubleArrowMarker";
import InteractiveCenterEdge from "./InteractiveCenterEdge";
import {
  updateEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import { getCenterEdgePoints } from "../utils/smoothStep";
import getInteractiveCenterEdgeDirection from "../utils/getInteractiveCenterEdgeDirection";
import getArrowDirection from "../utils/getArrowDirection";
import { calcEdgeMidpoint } from "../utils/calcEdgeMidpoint";
import getArrowRotation from "../utils/getArrowRotation";

export type EditableEdge = Edge<{
  center: CenterData;
  linePath?: LinePath;
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
  linePath,
}: EdgeProps<EditableEdge> & {
  markerMid?: MarkerType;
  type?: DEMOEdge["type"];
  actions?: EdgeToolbarAction[];
  style?: CSSProperties;
  centerX?: number;
  centerY?: number;
  isDraggable?: boolean;
  linePath?: "step" | "straight";
}) {
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const { screenToFlowPosition } = useReactFlow();

  const offset = 30;
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

  const [path, labelX, labelY] =
    linePath === "step"
      ? getSmoothStepPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourcePosition,
          targetPosition,
          centerX,
          centerY,
          offset,
          stepPosition,
        })
      : getStraightPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
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
    target: {
      x: targetX,
      y: targetY,
    },
    sourcePosition,
    targetPosition,
    offset,
  });

  const interactiveEdgeMidpoint = calcEdgeMidpoint(
    sourceCenterPosition ?? { x: labelX ?? centerX, y: labelY ?? centerY },
    targetCenterPosition ?? { x: labelX ?? centerX, y: labelY ?? centerY }
  );

  const arrowRotation = getArrowRotation({
    source: {
      x: sourceX,
      y: sourceY,
    },
    target: {
      x: targetX,
      y: targetY,
    },
    sourcePosition,
    targetPosition,
    offset,
    interactiveEdgeDirection,
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
          position={{
            x: interactiveEdgeMidpoint?.x ?? centerX,
            y: interactiveEdgeMidpoint?.y ?? centerY,
          }}
          actions={actions}
        />
      )}
      {markerMid && (
        <DoubleArrowMarker
          labelX={interactiveEdgeMidpoint.x ?? centerX}
          labelY={interactiveEdgeMidpoint.y ?? centerY}
          rotation={arrowRotation}
          direction={arrowDirection}
        />
      )}
    </>
  );
}
