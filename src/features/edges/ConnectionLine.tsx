import {
  getBezierPath,
  getSmoothStepPath,
  MarkerType,
  type ConnectionLineComponentProps,
} from "@xyflow/react";
import { getEdgeParams } from "./utils";
import type { DEMONode } from "../nodes/nodes.types";
import { useEffect } from "react";

const ConnectionLine = ({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode,
  ...restProps
}: ConnectionLineComponentProps<DEMONode>) => {
  if (!fromNode) {
    return null;
  }

  // Create a mock target node at the cursor position
  const targetNode = {
    id: "connection-target",
    measured: {
      width: 1,
      height: 1,
    },
    internals: {
      positionAbsolute: { x: toX, y: toY },
    },
  };

  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
    getEdgeParams(fromNode, targetNode);

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: sourcePosition || fromPosition,
    targetPosition: targetPosition || toPosition,
    targetX: targetX || toX,
    targetY: targetY || toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        d={edgePath}
        markerStart={MarkerType.Arrow}
      />
    </g>
  );
};

export default ConnectionLine;
