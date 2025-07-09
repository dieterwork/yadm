import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useToolbar } from "../toolbar/ToolbarStore";
import Icon from "../DEMO_objects/Icon";

interface NodeCursorPreviewProps {
  offset?: { x: number; y: number };
}

const NodeCursorPreview = ({
  offset = { x: 0, y: 0 },
}: NodeCursorPreviewProps) => {
  const nodeCursorRef = useRef<HTMLDivElement>(null!);
  const { selectedNodeType } = useToolbar();

  useEffect(() => {
    const nodeCursorEl = nodeCursorRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!nodeCursorEl) return;
      const x = e.clientX + offset.x;
      const y = e.clientY + offset.y;
      nodeCursorEl.style.transform = `translate(${x}px, ${y}px)`;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [offset.x, offset.y]);

  useEffect(() => {
    const pane = document.querySelector(".react-flow__pane");
    selectedNodeType
      ? pane?.classList.add("cursor-crosshair!")
      : pane?.classList.remove("cursor-crosshair!");
  }, [selectedNodeType]);

  return createPortal(
    <div
      className="node-cursor | fixed inset-0 pointer-events-none"
      ref={nodeCursorRef}
    >
      {selectedNodeType ? <Icon></Icon> : null}
    </div>,
    document.body
  );
};

export default NodeCursorPreview;
