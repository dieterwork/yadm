import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";
import type { DEMOEdge } from "../edges.types";
import DEMOEdgeToolbar from "../edge_toolbar/DEMOEdgeToolbar";

const TransactionTimeEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  id,
}: EdgeProps<DEMOEdge>) => {
  const [path, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge
        path={path}
        style={{ stroke: "var(--color-slate-500)", strokeWidth: 2 }}
      />
      {selected && (
        <DEMOEdgeToolbar
          edgeId={id}
          position={{ x: labelX, y: labelY }}
          actions={["delete"]}
        />
      )}
    </>
  );
};

export default TransactionTimeEdge;
