import {
  BaseEdge,
  useInternalNode,
  type Edge,
  type EdgeProps,
  type XYPosition,
} from "@xyflow/react";

import ControlPoint, { type ControlPointData } from "./ControlPoint";
import { useDEMOModeler } from "../modeler/useDEMOModeler.js";
import { useRef } from "react";
import {
  getEdgeParams,
  getLinearControlPoints,
  getLinearPath,
} from "./utils.js";
import { getPoints, getSmoothStepPath } from "./smoothStep.js";

const useIdsForInactiveControlPoints = (points: ControlPointData[]) => {
  const ids = useRef<string[]>([]);

  if (ids.current.length === points.length) {
    return points.map((point, i) =>
      point.id ? point : { ...point, id: ids.current[i] }
    );
  } else {
    ids.current = [];

    return points.map((point, i) => {
      if (!point.id) {
        const id = window.crypto.randomUUID();
        ids.current[i] = id;
        return { ...point, id: id };
      } else {
        ids.current[i] = point.id;
        return point;
      }
    });
  }
};

export type PrimitiveEdge = Edge<{
  points: ControlPointData[];
}>;

export type PrimitiveEdgeProps = Omit<
  EdgeProps<PrimitiveEdge>,
  | "sourceX"
  | "sourceY"
  | "targetX"
  | "targetY"
  | "sourcePosition"
  | "targetPosition"
> & { markerMid?: string };

// just to store some data outside the function so we can avoid re-rendering
let storeYVal = {};
// getting zoom from store - using it to calc mouse movement.
let zoom = 0;

const PrimitiveEdge = ({
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
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const setEdges = useDEMOModeler((state) => state.setEdges);

  if (!sourceNode || !targetNode) return null;

  const {
    sx: sourceX,
    sy: sourceY,
    tx: targetX,
    ty: targetY,
    sourcePos,
    targetPos,
  } = getEdgeParams(sourceNode, targetNode);

  const [points] = getPoints({
    source: { x: sourceX, y: sourceY },
    target: { x: targetX, y: targetX },
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    offset: 20,
    stepPosition: 0.5,
    center: { x: undefined, y: undefined },
  });

  const shouldShowPoints =
    selected || sourceNode.selected || targetNode.selected;

  const sourceOrigin: XYPosition = { x: sourceX, y: sourceY };
  const targetOrigin: XYPosition = { x: targetX, y: targetY };

  const setControlPoints = (
    update: (points: ControlPointData[]) => ControlPointData[]
  ) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id !== id) return edge;

        const _points = (edge.data?.points as ControlPointData[]) ?? points;
        const data = { ...edge.data, points: update(_points) };

        return { ...edge, data };
      })
    );
  };

  const pathPoints = [sourceOrigin]
    .concat(data.points.length === 0 ? points : data.points)
    .concat(targetOrigin);
  const controlPoints = getLinearControlPoints(pathPoints);

  const path = getSmoothStepPath(pathPoints);

  const controlPointsWithIds = useIdsForInactiveControlPoints(controlPoints);

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        className="base-edge"
        markerStart={markerStart}
        markerEnd={markerEnd}
        markerMid={markerMid}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: "black",
        }}
      />

      {shouldShowPoints &&
        controlPointsWithIds.map((point, index) => (
          <ControlPoint
            key={point.id}
            index={index}
            setControlPoints={setControlPoints}
            color={"black"}
            {...point}
          />
        ))}
    </>
  );
};

export default PrimitiveEdge;

// import {
//   getSmoothStepPath,
//   useInternalNode,
//   type BaseEdgeProps,
// } from "@xyflow/react";

// import { getEdgeParams } from "./utils.js";

// export interface PrimitiveEdgeProps
//   extends Omit<BaseEdgeProps, "target" | "source" | "path"> {
//   source: string;
//   target: string;
// }

// const PrimitiveEdge = ({
//   id,
//   source,
//   target,
//   ...restProps
// }: PrimitiveEdgeProps) => {
//   const sourceNode = useInternalNode(source);
//   const targetNode = useInternalNode(target);

//   if (!sourceNode || !targetNode) {
//     return null;
//   }

//   const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
//     sourceNode,
//     targetNode
//   );

//   const [edgePath] = getSmoothStepPath({
//     sourceX: sx,
//     sourceY: sy,
//     targetX: tx,
//     targetY: ty,
//     sourcePosition: sourcePos,
//     targetPosition: targetPos,
//   });

//   return (
//     <path
//       {...restProps}
//       id={id}
//       className="react-flow__edge-path"
//       d={edgePath}
//     />
//   );
// };

// export default PrimitiveEdge;
