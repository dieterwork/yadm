import {
  getSmoothStepPath,
  getStraightPath,
  MarkerType,
  type ConnectionLineComponentProps,
} from "@xyflow/react";
import { calcConnectionLineTargetXForTransactionTimeEdge } from "./utils/calcConnectionLineTargetXForTransactionTimeEdge";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";

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
  const isHandleEditModeEnabled = useDEMOModelerStore(
    (state) => state.isHandleEditModeEnabled,
  );

  // in handle edit mode a handle is being moved, not connected, so a connection
  // that is still in progress from before the mode was entered is not previewed
  if (isHandleEditModeEnabled) return null;

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
