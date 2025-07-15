import React, { useRef, useState, type ReactNode, type RefObject } from "react";
import type { DropEvent, DropItem, TextDropItem } from "react-aria";
import { useDrop } from "react-aria";

interface DropZoneProps {
  ref?: RefObject<HTMLDivElement>;
  children?: ReactNode;
  onDrop?: (e: DropEvent) => void;
  droppedItems?: unknown[];
}

const DropZone = ({ ref, onDrop, droppedItems, children }: DropZoneProps) => {
  if (!ref) ref = useRef<HTMLDivElement>(null!);

  const { dropProps, isDropTarget } = useDrop({
    ref,
    onDrop,
  });

  return (
    <div
      {...dropProps}
      role="button"
      tabIndex={0}
      ref={ref}
      className={`droppable h-full ${isDropTarget ? "target" : ""}`}
    >
      {children}
    </div>
  );
};

export default DropZone;
