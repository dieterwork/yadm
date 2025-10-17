import { useGesture, type Handler } from "@use-gesture/react";
import {
  EdgeLabelRenderer,
  getStraightPath,
  type BaseEdgeProps,
} from "@xyflow/react";
import { useId, type CSSProperties } from "react";

interface InteractiveCenterEdgeProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  active?: boolean;
  onDragStart?: Handler<
    "drag",
    PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
  >;
  onDrag?: Handler<
    "drag",
    PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
  >;
  onDragEnd?: Handler<
    "drag",
    PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
  >;
}

const InteractiveCenterEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  active,
  onDragStart,
  onDrag,
  onDragEnd,
}: InteractiveCenterEdgeProps) => {
  const bind = useGesture({
    onDragStart: (params) => {
      onDragStart && onDragStart(params);
    },
    onDrag: (params) => {
      onDrag && onDrag(params);
    },
    onDragEnd: (params) => {
      onDragEnd && onDragEnd(params);
    },
  });
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return (
    <path
      {...bind()}
      d={path}
      fill="none"
      stroke={"red"}
      strokeOpacity={1}
      strokeWidth={20}
      className="react-flow__edge-interaction nopan nodrag"
      tabIndex={0}
      style={{ pointerEvents: "all", touchAction: "none" }}
    />
  );
};

export default InteractiveCenterEdge;
