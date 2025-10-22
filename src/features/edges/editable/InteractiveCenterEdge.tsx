import { cn } from "@sglara/cn";
import { useGesture, type Handler } from "@use-gesture/react";
import { getStraightPath } from "@xyflow/react";

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
  direction?: "horizontal" | "vertical";
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
  direction,
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
      strokeOpacity={1}
      strokeWidth={20}
      className={cn(
        "react-flow__edge-interaction nopan nodrag",
        direction === "horizontal" && "cursor-col-resize",
        direction === "vertical" && "cursor-row-resize",
        !direction && "cursor-auto"
      )}
      tabIndex={0}
      style={{ pointerEvents: "all", touchAction: "none" }}
    />
  );
};

export default InteractiveCenterEdge;
