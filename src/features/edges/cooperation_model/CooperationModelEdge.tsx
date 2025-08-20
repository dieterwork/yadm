import PrimitiveEdge, { type PrimitiveEdgeProps } from "../PrimitiveEdge.js";

const CooperationModelEdge = ({ ...delegated }: PrimitiveEdgeProps) => {
  return <PrimitiveEdge {...delegated} />;
};

export default CooperationModelEdge;
