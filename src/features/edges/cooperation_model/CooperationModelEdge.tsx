import PrimitiveEdge, { type PrimitiveEdgeProps } from "../PrimitiveEdge.js";

const CooperationModelEdge = ({
  id,
  selected,
  source,
  target,
  markerEnd,
  markerStart,
  markerMid,
  style,
  data = { points: [] },
  ...delegated
}: PrimitiveEdgeProps) => {
  return (
    <PrimitiveEdge
      {...delegated}
      id={id}
      selected={selected}
      source={source}
      target={target}
      markerEnd={markerEnd}
      markerStart={markerStart}
      markerMid={markerMid}
      style={style}
      data={data}
    />
  );
};

export default CooperationModelEdge;
