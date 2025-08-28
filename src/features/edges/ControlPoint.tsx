import type { XYPosition } from "@xyflow/react";

import { useEffect, useRef, useState } from "react";
import { useReactFlow, useStore } from "@xyflow/react";
import type { ControlPoint as ControlPointType } from "./edges.types";

export type ControlPointProps = {
  id: string;
  x: number;
  y: number;
  color: string;
  active?: boolean;
  setControlPoints: (
    update: (points: ControlPointType[]) => ControlPointType[]
  ) => void;
};

export function ControlPoint({
  id,
  x,
  y,
  color,
  active,
  setControlPoints,
}: ControlPointProps) {
  const container = useStore((store) => store.domNode);
  const { screenToFlowPosition } = useReactFlow();
  const [dragging, setDragging] = useState(false);
  const ref = useRef<SVGCircleElement>(null);

  const deletePoint = () => {
    setControlPoints((points) => points.filter((point) => point.id !== id));
  };

  const updatePosition = (position: XYPosition) => {
    setControlPoints((points) => {
      return points.map((point) =>
        point.id === id ? { ...point, ...position, active: true } : point
      );
    });
  };

  useEffect(() => {
    if (!container || !active || !dragging) return;
    const onPointerMove = (e: PointerEvent) => {
      updatePosition(
        screenToFlowPosition({
          x: e.clientX,
          y: e.clientY,
        })
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      container.removeEventListener("pointermove", onPointerMove);

      if (!active) {
        e.preventDefault();
      }

      setDragging(false);
      updatePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp, { once: true });
    container.addEventListener("pointerleave", onPointerUp, { once: true });

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);

      setDragging(false);
    };
  }, [container, dragging, active, screenToFlowPosition]);

  // RENDER --------------------------------------------------------------------

  return (
    <circle
      ref={ref}
      tabIndex={0}
      className={"nopan nodrag"}
      cx={x}
      cy={y}
      r={active ? 4 : 3}
      strokeOpacity={active ? 1 : 0.3}
      stroke={color}
      fill={active ? color : "white"}
      style={{ pointerEvents: "all" }}
      onContextMenu={(e) => {
        e.preventDefault();
        deletePoint();
      }}
      onPointerDown={(e) => {
        if (e.button === 2) return;
        updatePosition({ x, y });
        setDragging(true);
      }}
      onPointerUp={() => setDragging(false)}
    />
  );
}
