import { type PointerEventHandler } from "react";
import { useStore } from "@xyflow/react";
import { getStroke } from "perfect-freehand";
import { setPoints, useDrawStore } from "../store/useDrawStore";
import getSvgPathFromStroke from "../utils/getSvgPathFromStroke";

const DrawTool = () => {
  const points = useDrawStore((state) => state.points);
  const isEnabled = useDrawStore((state) => state.isEnabled);

  const { width, height, transform } = useStore((state) => ({
    width: state.width,
    height: state.height,
    transform: state.transform,
  }));

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled) return;
    if (e.target instanceof HTMLElement) {
      e.target.setPointerCapture(e.pointerId);
      setPoints([[e.pageX, e.pageY, e.pressure]]);
    }
  };

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (!isEnabled) return;
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  };

  const stroke = getStroke(points, {
    size: 16,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  });

  const pathData = getSvgPathFromStroke(stroke);

  return (
    <div className="draw-tool-container">
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="touch-none w-full h-full absolute z-10"
      >
        {points && <path d={pathData} />}
      </svg>
    </div>
  );
};

export default DrawTool;
