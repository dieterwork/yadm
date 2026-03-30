import { useRef, useState, type PointerEventHandler } from "react";
import { getStroke } from "perfect-freehand";
import getSvgPathFromStroke from "../utils/getSvgPathFromStroke";
import { cn } from "@sglara/cn";
import {
  addNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import getPointsRelativeCoordinates from "../utils/getRelativeMouseCoordinates";
import getRelativeStrokeCoordinates from "../utils/getRelativePointsCoordinates";
import uuid from "$/shared/utils/uuid";
import type { ShapeNode } from "$/features/nodes/nodes.types";
import { useReactFlow } from "@xyflow/react";
import getMinPointsCoordinates from "../utils/getMinPointsCoordinates";
import getShapeDimensions from "../utils/getShapeDimensions";
import getMaxPointsCoordinates from "../utils/getMaxPointsCoordinates";
import { createNode } from "$/features/nodes/utils/createNode";
import { useTranslation } from "react-i18next";

const DrawTool = () => {
  const [points, setPoints] = useState<Array<[number, number, number]>>([]);
  const action = useDEMOModelerStore((state) => state.action);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isDrawToolEnabled = action === "draw";
  const { screenToFlowPosition } = useReactFlow();
  const viewport = useDEMOModelerStore((state) => state.viewport);
  const { t } = useTranslation();

  const stroke = getStroke(points, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const pathData = getSvgPathFromStroke(stroke);

  const offset = useRef<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    if (e.target instanceof HTMLElement || e.target instanceof SVGSVGElement) {
      const { top, left } = e.target.getBoundingClientRect();
      offset.current.top = top;
      offset.current.left = left;
      e.target.setPointerCapture(e.pointerId);
      const [x, y] = getPointsRelativeCoordinates(offset.current, [
        e.pageX,
        e.pageY,
      ]);
      setPoints([[x, y, e.pressure]]);
    }
  };

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    if (e.buttons !== 1) return;
    if (e.target instanceof HTMLElement || e.target instanceof SVGSVGElement) {
      const [x, y] = getPointsRelativeCoordinates(offset.current, [
        e.pageX,
        e.pageY,
      ]);
      setPoints([...points, [x, y, e.pressure]]);
    }
  };

  const handlePointerUp: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    const relativeStroke = getRelativeStrokeCoordinates(stroke, viewport.zoom);
    const [minX, minY] = getMinPointsCoordinates(stroke);
    const [maxX, maxY] = getMaxPointsCoordinates(stroke);
    const position = screenToFlowPosition({
      x: minX + offset.current.left,
      y: minY + offset.current.top,
    });
    const dimensions = getShapeDimensions(
      [minX, minY],
      [maxX, maxY],
      viewport.zoom
    );
    const newNode = createNode({
      type: "shape",
      translateFn: t,
      width: dimensions.width,
      height: dimensions.height,
      data: {
        points: relativeStroke,
      },
      style: {
        stroke: "#000",
      },
      position,
      selected: false,
    });
    addNode(newNode);
    setPoints([]);
  };

  return (
    <div
      className={cn(
        "draw-tool-container | w-full h-full absolute nopan nodrag",
        isDrawToolEnabled ? "z-20" : "z-0"
      )}
    >
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn("touch-none w-full h-full nopan nodrag")}
      >
        {points && <path d={pathData} />}
      </svg>
    </div>
  );
};

export default DrawTool;
