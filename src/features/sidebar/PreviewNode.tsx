import { useEffect, useRef, useState } from "react";
import { shapeMap } from "../shapes/shapeMap";
import { createPortal } from "react-dom";
import Shape from "../shapes/Shape";
import { DEFAULT_SIZE_MAP } from "../nodes/utils/consts";
import { useReactFlow, useStore, useViewport } from "@xyflow/react";
import { usePreviewNode } from "./usePreviewNode";

interface PreviewNodeProps {
  type: string;
}
const PreviewNode = ({ type }: PreviewNodeProps) => {
  const DEMOShape = shapeMap[type];
  const size = DEFAULT_SIZE_MAP[type];
  const shapeRef = useRef<SVGSVGElement>(null!);
  const { position, updatePosition } = usePreviewNode();
  const reactFlow = useReactFlow();
  const { zoom } = useViewport();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!DEMOShape || !size) return null;

  return (
    <>
      {createPortal(
        <div
          className={`preview-node | fixed z-9999 pointer-events-none`}
          style={{ top: position.y, left: position.x }}
        >
          <Shape
            ref={shapeRef}
            width={size.width * zoom}
            height={size.height * zoom}
            stroke="black"
            strokeWidth={2}
          >
            <DEMOShape />
          </Shape>
        </div>,
        document.body
      )}
    </>
  );
};

export default PreviewNode;
