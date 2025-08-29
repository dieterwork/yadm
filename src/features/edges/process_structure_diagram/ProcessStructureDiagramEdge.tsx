import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent, type EditableEdge } from "../EditableEdge";

const ProcessStructureDiagramEdge = ({
  ...restProps
}: EdgeProps<EditableEdge>) => {
  return <EditableEdgeComponent {...restProps} />;
};

export default ProcessStructureDiagramEdge;
