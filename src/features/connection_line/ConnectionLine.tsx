import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  type ConnectionLineComponentProps,
  type XYPosition,
} from "@xyflow/react";
import { calcConnectionLineTargetXForTransactionTimeEdge } from "./utils/calcConnectionLineTargetXForTransactionTimeEdge";

const ConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition,
  connectionStatus,
  fromNode,
}: ConnectionLineComponentProps) => {
  const [smoothStepPath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
  });

  const [linearPath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX:
      fromNode.type === "transaction_time"
        ? calcConnectionLineTargetXForTransactionTimeEdge(
            toX,
            fromX,
            { width: fromNode.width, height: fromNode.height },
            fromNode.position
          )
        : toX,
    targetY: fromNode.type === "transaction_time" ? fromY : toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="var(--color-rose-500)"
        strokeWidth={2}
        className={connectionStatus === "valid" ? "" : "animated"}
        d={fromNode.type === "transaction_time" ? linearPath : smoothStepPath}
        markerStart={MarkerType.ArrowClosed}
        markerWidth={20}
        markerEnd={MarkerType.ArrowClosed}
      />
    </g>
  );
};

export default ConnectionLine;
