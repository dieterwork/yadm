import {
  getConnectedEdges,
  Handle,
  Position,
  type HandleProps,
} from "@xyflow/react";
import {
  getNode,
  setEdges,
  setNodes,
  updateNodeHandles,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useState } from "react";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  onDragStart,
  onDrag,
  onDragEnd,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
  onDragStart?: ({
    event,
    xy,
  }: {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    xy: [number, number];
  }) => void;
  onDrag?: ({
    event,
    xy,
  }: {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    xy: [number, number];
  }) => void;
  onDragEnd?: ({
    event,
    xy,
  }: {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    xy: [number, number];
  }) => void;
}) => {
  const isHandleEditModeEnabled = useDEMOModelerStore(
    (state) => state.isHandleEditModeEnabled
  );

  const bind = useGesture({
    onDragStart: ({ event, xy }) => {
      if (!isHandleEditModeEnabled) return;
      event.preventDefault();
      event.stopPropagation();
      onDragStart && onDragStart({ event, xy });
    },
    onDrag: ({ event, xy }) => {
      if (!isHandleEditModeEnabled) return;
      event.preventDefault();
      event.stopPropagation();
      onDrag && onDrag({ event, xy });
    },
    onDragEnd: ({ event, xy }) => {
      if (!isHandleEditModeEnabled) return;
      event.preventDefault();
      event.stopPropagation();
      onDragEnd && onDragEnd({ event, xy });
    },
  });

  return (
    <Handle
      {...restProps}
      {...(bind() as any)}
      style={{
        left:
          position === Position.Top || position === Position.Bottom
            ? (offset ?? 0.5) * 100 + "%"
            : undefined,
        top:
          position === Position.Left || position === Position.Right
            ? (offset ?? 0.5) * 100 + "%"
            : undefined,
      }}
      className={cn(
        "demo-handle",
        isHandleEditModeEnabled &&
          (position === Position.Top || position === Position.Bottom) &&
          "cursor-col-resize!",
        isHandleEditModeEnabled &&
          (position === Position.Right || position === Position.Left) &&
          "cursor-row-resize!"
      )}
      id={id}
      position={position}
    />
  );
};

export default DEMOHandle;
