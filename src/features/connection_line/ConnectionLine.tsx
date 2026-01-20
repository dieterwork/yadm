import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  type ConnectionLineComponentProps,
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
  const [path] =
    fromNode.type !== "transaction_time"
      ? getSmoothStepPath({
          sourceX: fromX,
          sourceY: fromY,
          targetX: toX,
          targetY: toY,
          sourcePosition: fromPosition,
          targetPosition: toPosition,
          offset: 30,
        })
      : getStraightPath({
          sourceX: fromX,
          sourceY: fromY,
          targetX: calcConnectionLineTargetXForTransactionTimeEdge(
            toX,
            fromX,
            fromNode.position.x,
            fromPosition,
            fromNode.measured.width
          ),
          targetY: fromY,
        });

  return (
    <g>
      <path
        fill="none"
        stroke="var(--color-sky-500)"
        strokeWidth={2}
        className={connectionStatus === "valid" ? "" : "animated"}
        d={path}
        markerStart={MarkerType.ArrowClosed}
        markerWidth={20}
        markerEnd={MarkerType.ArrowClosed}
      />
    </g>
  );
};

export default ConnectionLine;
