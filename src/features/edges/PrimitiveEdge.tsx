import {
  BaseEdge,
  getSmoothStepPath,
  getStraightPath,
  useInternalNode,
  type BaseEdgeProps,
} from "@xyflow/react";

import { getEdgeParams } from "./utils.js";

export interface PrimitiveEdgeProps
  extends Omit<BaseEdgeProps, "target" | "source" | "path"> {
  source: string;
  target: string;
}

const PrimitiveEdge = ({
  id,
  source,
  target,
  ...restProps
}: PrimitiveEdgeProps) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  return (
    <path
      {...restProps}
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
    />
  );
};

export default PrimitiveEdge;
