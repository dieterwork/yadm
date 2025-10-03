import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ProcessStructureDiagramEdge } from "../edges.types";

const ProcessStructureDiagramEdge = ({
  id,
  ...restProps
}: EdgeProps<ProcessStructureDiagramEdge>) => {
  return (
    <>
      <EditableEdgeComponent
        {...restProps}
        id={id}
        style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
        actions={["delete", "swapConnection"]}
      />
    </>
  );
};

export default ProcessStructureDiagramEdge;
