import { type PointerEventHandler } from "react";
import { useStore } from "@xyflow/react";
import { getStroke } from "perfect-freehand";
import {
  setPoints,
  takePointsSnapshot,
  useDrawStore,
} from "../store/useDrawStore";
import getSvgPathFromStroke from "../utils/getSvgPathFromStroke";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";

const DrawTool = () => {
  const points = useDrawStore((state) => state.points);
  const action = useDEMOModelerStore((state) => state.action);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isDrawToolEnabled = action === "draw";

  const { width, height, transform } = useStore((state) => ({
    width: state.width,
    height: state.height,
    transform: state.transform,
  }));

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    if (e.target instanceof HTMLElement) {
      e.target.setPointerCapture(e.pointerId);
      setPoints([[e.pageX, e.pageY, e.pressure]]);
    }
  };

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  };

  const handlePointerUp: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled || !isDrawToolEnabled) return;
    takePointsSnapshot(points);
  };

  const stroke = getStroke(points, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const pathData = getSvgPathFromStroke(stroke);

  return (
    <div className="draw-tool-container | w-full h-full absolute z-20">
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "touch-none w-full h-full",
          (!isEnabled || !isDrawToolEnabled) && "pointer-events-none"
        )}
      >
        {points && <path d={pathData} />}
      </svg>
    </div>
  );
};

export default DrawTool;
