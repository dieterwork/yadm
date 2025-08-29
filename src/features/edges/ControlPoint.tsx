import type { XYPosition } from "@xyflow/react";

import { useRef, useState } from "react";
import { useReactFlow, useStore, useViewport } from "@xyflow/react";
import type { ControlPointData } from "./edges.types";
import { useDrag, useGesture, type Vector2 } from "@use-gesture/react";

export type ControlPointProps = {
  x: number;
  y: number;
  color: string;
  active?: boolean;
  setControlPoint: (
    update: (point: ControlPointData) => ControlPointData
  ) => void;
};

export function ControlPoint({
  x,
  y,
  color,
  active,
  setControlPoint,
}: ControlPointProps) {
  const { zoom } = useViewport();
  const ref = useRef<SVGCircleElement>(null);

  const updatePosition = (delta: Vector2) => {
    setControlPoint((point) => ({
      ...point,
      x: point.x - delta[0] / zoom,
      y: point.y - delta[1] / zoom,
    }));
  };

  const bind = useDrag((state) => {
    updatePosition(state.delta);
  });

  return (
    <circle
      aria-label="Control Point"
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
      {...bind()}
    />
  );
}
