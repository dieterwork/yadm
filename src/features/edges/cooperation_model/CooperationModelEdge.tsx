import { EditableEdgeComponent } from "../EditableEdge.js";

const CooperationModelEdge = ({ ...delegated }: PrimitiveEdgeProps) => {
  return <EditableEdgeComponent {...delegated} c />;
};

export default CooperationModelEdge;
