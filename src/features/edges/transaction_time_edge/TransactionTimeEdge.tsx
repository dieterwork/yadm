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
  data,
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
          id={id}
          data={data}
          type="transaction_time_edge"
          selected={selected}
          position={{ x: labelX, y: labelY }}
        />
      )}
    </>
  );
};

export default TransactionTimeEdge;
