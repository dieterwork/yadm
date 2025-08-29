import { type EdgeProps } from "@xyflow/react";
import { EditableEdgeComponent, type EditableEdge } from "../EditableEdge";

const ObjectFactDiagramEdge = ({ ...restProps }: EdgeProps<EditableEdge>) => {
  return <EditableEdgeComponent {...restProps} />;
};

export default ObjectFactDiagramEdge;
