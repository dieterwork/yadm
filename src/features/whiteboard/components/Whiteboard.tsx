import { useEffect, useRef, useState, type PointerEventHandler } from "react";
import { cn } from "@sglara/cn";
import {
  addNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useReactFlow } from "@xyflow/react";
import useWhiteboardStore from "../store/useWhiteboardStore";
import type { Points } from "../types/whiteboard.types";
import type { WhiteboardNodeType } from "$/features/nodes/nodes.types";
import processPoints from "../utils/processPoints";
import convertPointsToPath from "../utils/convertPointsToPath";
import uuid from "$/shared/utils/uuid";
import takeWhiteboardSnapshotAndSave from "../utils/takeWhiteboardSnapshotAndSave";

const Whiteboard = () => {
  const [points, setPoints] = useState<Points>([]);
  const pointRef = useRef<Points>([]);
  const action = useDEMOModelerStore((state) => state.action);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isWhiteboardEnabled = action === "draw";
  const { screenToFlowPosition } = useReactFlow();
  const color = useWhiteboardStore((state) => state.color);
  const viewport = useDEMOModelerStore((state) => state.viewport);
  const path = convertPointsToPath(points, viewport.zoom);
  const offset = useRef({ top: 0, left: 0 });

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (
      !(e.target instanceof HTMLElement) &&
      !(e.target instanceof SVGSVGElement)
    ) {
      return;
    }
    e.target.setPointerCapture(e.pointerId);
    const { top, left } = e.target.getBoundingClientRect();
    offset.current = { top, left };
    const nextPoints = [
      ...points,
      [e.pageX - offset.current.left, e.pageY - offset.current.top, e.pressure],
    ] satisfies Points;
    pointRef.current = nextPoints;
    setPoints(nextPoints);
  };

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.buttons !== 1) return;
    if (
      !(e.target instanceof HTMLElement) &&
      !(e.target instanceof SVGSVGElement)
    ) {
      return;
    }
    const points = pointRef.current;
    const nextPoints = [
      ...points,
      [e.pageX - offset.current.left, e.pageY - offset.current.top, e.pressure],
    ] satisfies Points;
    pointRef.current = nextPoints;
    setPoints(nextPoints);
  };

  const handlePointerUp: PointerEventHandler<SVGSVGElement> = (e) => {
    if (
      !(e.target instanceof HTMLElement) &&
      !(e.target instanceof SVGSVGElement)
    ) {
      return;
    }
    e.target.releasePointerCapture(e.pointerId);

    const { data, height, width, position } = processPoints(
      points,
      screenToFlowPosition,
      offset.current
    );

    const newNode: WhiteboardNodeType = {
      id: uuid(),
      type: "whiteboard",
      data: { ...data, color },
      height,
      width,
      position,
      deletable: true,
      zIndex: 1000,
    };

    takeWhiteboardSnapshotAndSave();
    addNode(newNode);

    setPoints([]);
  };

  return (
    <div
      className={cn(
        "draw-tool-container | w-full h-full absolute nopan nodrag",
        isWhiteboardEnabled ? "z-20" : "z-0"
      )}
    >
      <svg
        onPointerDown={
          isEnabled && isWhiteboardEnabled ? handlePointerDown : undefined
        }
        onPointerMove={
          points.length > 0 && isEnabled && isWhiteboardEnabled
            ? handlePointerMove
            : undefined
        }
        onPointerUp={
          isEnabled && isWhiteboardEnabled ? handlePointerUp : undefined
        }
        className={cn("touch-none w-full h-full nopan nodrag")}
      >
        {points && <path d={path} fill={color} />}
      </svg>
    </div>
  );
};

export default Whiteboard;
