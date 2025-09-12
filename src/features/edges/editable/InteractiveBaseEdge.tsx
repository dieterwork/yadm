import type { BaseEdgeProps } from "@xyflow/react";
import type { CSSProperties } from "react";

interface InteractiveBaseEdgeProps {
  id: string;
  path: string;
  style: CSSProperties;
  markerEnd?: string;
  markerStart?: string;
  markerMid?: string;
  onPointerDown?: (e: PointerEvent) => void;
}

const InteractiveBaseEdge = ({
  id,
  path,
  style,
  markerEnd,
  markerStart,
  interactionWidth = 20,
  onPointerDown,
}: BaseEdgeProps) => {
  return (
    <>
      <path
        id={id}
        style={style}
        d={path}
        fill="none"
        className="react-flow__edge-path"
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      {interactionWidth && (
        <path
          d={path}
          fill="none"
          strokeOpacity={0}
          strokeWidth={interactionWidth}
          className="react-flow__edge-interaction"
          onPointerDown={onPointerDown}
        />
      )}
    </>
  );
};

export default InteractiveBaseEdge;
