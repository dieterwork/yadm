import PrimitiveEdge, { type PrimitiveEdgeProps } from "../PrimitiveEdge.js";

const CooperationModelEdge = ({
  id,
  source,
  target,
  markerEnd,
}: PrimitiveEdgeProps) => {
  return (
    <PrimitiveEdge
      id={id}
      source={source}
      target={target}
      markerEnd={markerEnd}
      style={{ fill: "red" }}
    />
  );
};

export default CooperationModelEdge;
