import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

import type { CenterData, DEMOEdge, LinePath } from "../edges.types";
import DEMOEdgeToolbar, {
  type EdgeToolbarAction,
} from "../../edge_toolbar/DEMOEdgeToolbar";
import { type CSSProperties, type ReactNode } from "react";
import DoubleArrowMarker from "$/shared/components/ui/markers/DoubleArrowMarker";
import InteractiveCenterEdge from "./InteractiveCenterEdge";
import {
  getNode,
  updateEdge,
  updateEdgeData,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import { getCenterEdgePoints } from "../utils/smoothStep";
import {
  getStartLabel0Translate,
  getStartLabel1Translate,
  getMiddleLabel0Translate,
  getMiddleLabel1Translate,
  getEndLabel0Translate,
  getEndLabel1Translate,
} from "./cardinalityTranslateCalculations";
import getInteractiveCenterEdgeDirection from "../utils/getInteractiveCenterEdgeDirection";
import getArrowDirection from "../utils/getArrowDirection";
import { calcEdgeMidpoint } from "../utils/calcEdgeMidpoint";
import getArrowRotation from "../utils/getArrowRotation";
import ExclusionLawMarker from "../object_fact_diagram/ExclusionLawMarker";
import CardinalityLabel from "../object_fact_diagram/CardinalityLabel";
import getNodeHandle from "$/features/connection_handles/utils/getHandle";

export type EditableEdge = Edge<{
  center: CenterData;
  linePath?: LinePath;
}>;

export function EditableEdgeComponent({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  markerStart,
  markerMid,
  centerX,
  centerY,
  selected,
  actions,
  style,
  linePath,
  law,
  cardinality,
  target,
  targetHandleId,
}: Omit<EdgeProps<EditableEdge>, "data"> & {
  markerMid?: MarkerType;
  type?: DEMOEdge["type"];
  actions?: EdgeToolbarAction[];
  style?: CSSProperties;
  centerX?: number;
  centerY?: number;
  isDraggable?: boolean;
  linePath?: "step" | "straight";
  children?: ReactNode;
  law?: "exclusion" | "precedence";
  cardinality?: {
    startLabel0: string;
    startLabel1: string;
    middleLabel0: string;
    middleLabel1: string;
    endLabel0: string;
    endLabel1: string;
  };
}) {
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const { screenToFlowPosition } = useReactFlow();

  const offset = 30;
  const stepPosition = 0.5;

  const targetNode = getNode(target);

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
    targetCenterPosition ?? { x: labelX ?? centerX, y: labelY ?? centerY },
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

  const midLabelDirection: "horizontal" | "vertical" =
    Math.abs(Math.cos(arrowRotation ?? 0)) > 0.5 ? "horizontal" : "vertical";

  const targetHandle = getNodeHandle(targetNode, targetHandleId);

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
        active={isEnabled}
        direction={interactiveEdgeDirection}
        onDoubleClick={(e) => {
          e.stopPropagation();
          updateEdgeData(id, { center: undefined });
        }}
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
            x: interactiveEdgeMidpoint?.x,
            y: interactiveEdgeMidpoint?.y,
          }}
          actions={actions}
        />
      )}
      {markerMid && (
        <DoubleArrowMarker
          labelX={interactiveEdgeMidpoint.x}
          labelY={interactiveEdgeMidpoint.y}
          rotation={arrowRotation}
          direction={arrowDirection}
        />
      )}
      {law === "exclusion" && (
        <ExclusionLawMarker
          labelX={interactiveEdgeMidpoint.x}
          labelY={interactiveEdgeMidpoint.y}
        />
      )}
      {cardinality &&
        !!targetHandle?.handle.derivation &&
        targetHandle?.handle.derivation === "none" && (
          <>
            <CardinalityLabel
              edgeId={id}
              field="startLabel0"
              isEnabled={isEnabled}
              labelX={sourceX}
              labelY={sourceY}
              content={cardinality.startLabel0}
              translateX={getStartLabel0Translate(sourcePosition).x}
              translateY={getStartLabel0Translate(sourcePosition).y}
            />
            <CardinalityLabel
              edgeId={id}
              field="startLabel1"
              isEnabled={isEnabled}
              labelX={sourceX}
              labelY={sourceY}
              content={cardinality.startLabel1}
              translateX={getStartLabel1Translate(sourcePosition).x}
              translateY={getStartLabel1Translate(sourcePosition).y}
            />
            <CardinalityLabel
              edgeId={id}
              field="middleLabel0"
              isEnabled={isEnabled}
              labelX={interactiveEdgeMidpoint.x}
              labelY={interactiveEdgeMidpoint.y}
              content={cardinality.middleLabel0}
              translateX={getMiddleLabel0Translate(midLabelDirection).x}
              translateY={getMiddleLabel0Translate(midLabelDirection).y}
            />
            <CardinalityLabel
              edgeId={id}
              field="middleLabel1"
              isEnabled={isEnabled}
              labelX={interactiveEdgeMidpoint.x}
              labelY={interactiveEdgeMidpoint.y}
              content={cardinality.middleLabel1}
              translateX={getMiddleLabel1Translate(midLabelDirection).x}
              translateY={getMiddleLabel1Translate(midLabelDirection).y}
            />
            <CardinalityLabel
              edgeId={id}
              field="endLabel0"
              isEnabled={isEnabled}
              labelX={targetX}
              labelY={targetY}
              content={cardinality.endLabel0}
              translateX={getEndLabel0Translate(targetPosition).x}
              translateY={getEndLabel0Translate(targetPosition).y}
            />
            <CardinalityLabel
              edgeId={id}
              field="endLabel1"
              isEnabled={isEnabled}
              labelX={targetX}
              labelY={targetY}
              content={cardinality.endLabel1}
              translateX={getEndLabel1Translate(targetPosition).x}
              translateY={getEndLabel1Translate(targetPosition).y}
            />
          </>
        )}
    </>
  );
}
