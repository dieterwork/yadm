import { EditableEdgeComponent } from "../EditableEdge.js";
import { type PrimitiveEdgeProps } from "../PrimitiveEdge.js";

const CooperationModelEdge = ({ ...delegated }: PrimitiveEdgeProps) => {
  return <EditableEdgeComponent {...delegated} c />;
};

export default CooperationModelEdge;
