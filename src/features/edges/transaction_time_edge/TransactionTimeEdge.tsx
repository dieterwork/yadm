import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";
import type { DEMOEdge } from "../edges.types";

const TransactionTimeEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<DEMOEdge>) => {
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return (
    <BaseEdge
      path={path}
      style={{ stroke: "var(--color-slate-500)", strokeWidth: 3 }}
    />
  );
};

export default TransactionTimeEdge;
