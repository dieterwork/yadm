import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  type ConnectionLineComponentProps,
  type XYPosition,
} from "@xyflow/react";

const calcConnectionLineTargetXForTransactionTimeEdge = (
  toX: number,
  fromX: number,
  nodeDimensions: { width?: number; height?: number },
  nodePosition: XYPosition
) => {
  if (!nodeDimensions.width || !nodeDimensions.height) return toX;
  if (
    toX < nodePosition.x - nodeDimensions.width / 2 ||
    toX > nodePosition.x + nodeDimensions.width / 2
  ) {
    return toX;
  } else {
    return fromX;
  }
};

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
