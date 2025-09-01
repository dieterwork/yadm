import { type CSSProperties, useEffect, useRef } from "react";
import { type ReactFlowState, useStore } from "@xyflow/react";

const canvasStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none",
};

export type HelperLinesProps = {
  horizontal?: number;
  vertical?: number;
  isDisabled: boolean;
};

const HelperLines = ({
  horizontal,
  vertical,
  isDisabled,
}: HelperLinesProps) => {
  const { width, height, transform } = useStore((state: ReactFlowState) => ({
    width: state.width,
    height: state.height,
    transform: state.transform,
  }));

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isDisabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) {
      return;
    }

    const dpi = window.devicePixelRatio;
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#0041d0";

    if (typeof vertical === "number") {
      ctx.moveTo(vertical * transform[2] + transform[0], 0);
      ctx.lineTo(vertical * transform[2] + transform[0], height);
      ctx.stroke();
    }

    if (typeof horizontal === "number") {
      ctx.moveTo(0, horizontal * transform[2] + transform[1]);
      ctx.lineTo(width, horizontal * transform[2] + transform[1]);
      ctx.stroke();
    }
  }, [width, height, transform, horizontal, vertical, isDisabled]);

  return (
    <canvas
      ref={canvasRef}
      className="react-flow__canvas"
      style={canvasStyle}
    />
  );
};

export default HelperLines;
