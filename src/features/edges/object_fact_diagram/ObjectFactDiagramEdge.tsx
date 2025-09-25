import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";
import EdgeToolbar from "../edge_toolbar/DEMOEdgeToolbar";

const ObjectFactDiagramEdge = ({
  id,
  data,
  selected,
  ...restProps
}: EdgeProps<EditableEdge>) => {
  return (
    <>
      <EditableEdgeComponent
        {...restProps}
        id={id}
        data={data}
        selected={selected}
        style={{ stroke: "var(--color-slate-900)", strokeWidth: 2 }}
      />
    </>
  );
};

export default ObjectFactDiagramEdge;
