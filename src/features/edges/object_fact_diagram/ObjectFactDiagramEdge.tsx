import { type EdgeProps } from "@xyflow/react";
import {
  EditableEdgeComponent,
  type EditableEdge,
} from "../editable/EditableEdge";

const ObjectFactDiagramEdge = ({ ...restProps }: EdgeProps<EditableEdge>) => {
  return <EditableEdgeComponent {...restProps} />;
};

export default ObjectFactDiagramEdge;
