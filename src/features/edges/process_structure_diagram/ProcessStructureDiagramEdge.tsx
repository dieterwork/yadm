import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ProcessStructureDiagramEdge as ProcessStructureDiagramEdgeType } from "../edges.types";

const ProcessStructureDiagramEdge = ({
  data,
  ...restProps
}: EdgeProps<ProcessStructureDiagramEdgeType>) => {
  return (
    <>
      <EditableEdgeComponent
        {...restProps}
        centerX={data?.center?.x}
        centerY={data?.center?.y}
        isDraggable={data?.center?.active}
        style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
        actions={["swapConnection", "resetEdgeCenter", "changeLinePath"]}
        linePath={data?.linePath}
      />
    </>
  );
};

export default ProcessStructureDiagramEdge;
