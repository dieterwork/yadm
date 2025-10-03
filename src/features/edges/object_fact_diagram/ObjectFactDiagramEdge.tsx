import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent } from "../editable/EditableEdge";
import type { ObjectFactDiagramEdge } from "../edges.types";

const ObjectFactDiagramEdge = ({
  id,
  data,
  ...restProps
}: EdgeProps<ObjectFactDiagramEdge>) => {
  console.log(data);
  return (
    <EditableEdgeComponent
      {...restProps}
      data={data}
      markerMid={data?.markerMid}
      id={id}
      style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
      actions={["delete", "swapConnection"]}
    />
  );
};

export default ObjectFactDiagramEdge;
