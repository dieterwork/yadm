import {
  getSmoothStepPath,
  getStraightPath,
  useInternalNode,
  type EdgeProps,
} from "@xyflow/react";
import type { DEMONode } from "../nodes/nodes.types";
import type { DEMOEdge } from "./edges.types";

const DEMOEdgeBase = ({
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  type,
  ...restProps
}: EdgeProps & { type?: DEMOEdge["type"] }) => {
  const sourceNode = useInternalNode<DEMONode>(source);
  const targetNode = useInternalNode<DEMONode>(target);
  if (!sourceNode || !targetNode) {
    return null;
  }

  const [path] =
    type !== "transaction_time_edge"
      ? getSmoothStepPath({
          sourceX: sourceX,
          sourceY: sourceY,
          targetX: targetX,
          targetY: targetY,
          sourcePosition: sourcePosition,
          targetPosition: targetPosition,
        })
      : getStraightPath({ sourceX, sourceY, targetX, targetY });
};

export default DEMOEdgeBase;
