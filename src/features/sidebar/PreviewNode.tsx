import { useEffect, useRef, useState } from "react";
import { shapeMap } from "../shapes/shapeMap";
import { createPortal } from "react-dom";
import Shape from "../shapes/Shape";
import { DEFAULT_SIZE_MAP } from "../nodes/utils/consts";
import { useReactFlow, useStore, useViewport } from "@xyflow/react";
import { usePreviewNode } from "./usePreviewNode";
import { useShallow } from "zustand/react/shallow";

interface PreviewNodeProps {
  type?: string;
}
const PreviewNode = ({ type }: PreviewNodeProps) => {
  const DEMOShape = shapeMap[type];
  const size = DEFAULT_SIZE_MAP[type];
  const shapeRef = useRef<SVGSVGElement>(null!);
  const { previewNode, updatePosition } = usePreviewNode(
    useShallow((state) => ({
      previewNode: state.previewNode,
      updatePosition: state.updatePosition,
    }))
  );
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

  if (!size) return null;

  return (
    <>
      {createPortal(
        <div
          className={`preview-node | fixed z-9999 pointer-events-none`}
          style={{
            top: previewNode?.position.y ?? 0,
            left: previewNode?.position.x ?? 0,
          }}
        >
          {!DEMOShape && (
            <div
              className="aspect-square border-1"
              style={{ width: size.width * zoom, height: size.height * zoom }}
            ></div>
          )}
          {DEMOShape && (
            <Shape
              ref={shapeRef}
              width={size.width * zoom}
              height={size.height * zoom}
              stroke="black"
              strokeWidth={2}
            >
              <DEMOShape />
            </Shape>
          )}
        </div>,
        document.body
      )}
    </>
  );
};

export default PreviewNode;
