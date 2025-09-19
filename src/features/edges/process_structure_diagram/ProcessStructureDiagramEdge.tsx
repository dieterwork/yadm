import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";
import EdgeToolbar from "../EdgeToolbar";

const ProcessStructureDiagramEdge = ({
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
      {selected && (
        <EdgeToolbar
          id={id}
          data={data}
          type="process_structure_diagram_edge"
          selected={selected}
        />
      )}
    </>
  );
};

export default ProcessStructureDiagramEdge;
