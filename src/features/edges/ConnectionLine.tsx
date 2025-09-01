import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  type ConnectionLineComponentProps,
} from "@xyflow/react";

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
    targetX: toX,
    targetY: fromNode.type === "transaction_time" ? fromY : toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke={"red"}
        strokeWidth={2}
        className={connectionStatus === "valid" ? "" : "animated"}
        d={fromNode.type === "transaction_time" ? linearPath : smoothStepPath}
        markerStart={MarkerType.ArrowClosed}
        markerWidth={25}
        markerEnd={MarkerType.ArrowClosed}
      />
    </g>
  );
};

export default ConnectionLine;
