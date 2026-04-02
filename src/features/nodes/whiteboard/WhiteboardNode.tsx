import { NodeResizer, useEdges, type NodeProps } from "@xyflow/react";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import DEMONodeToolbar from "$/features/node_toolbar/DEMONodeToolbar";
import type { Points } from "$/features/whiteboard/types/whiteboard.types";
import convertPointsToPath from "$/features/whiteboard/utils/convertPointsToPath";
import type { WhiteboardNodeType } from "../nodes.types";
import { useEffect, useRef, useState } from "react";

const cornerResizeControlClasses = [
  ["top", "left"],
  ["top", "right"],
  ["bottom", "left"],
  ["bottom", "right"],
] as const;

const WhiteboardNode = ({
  id,
  width,
  height,
  data,
  selected,
  dragging,
}: NodeProps<WhiteboardNodeType>) => {
  const { points, color, initialSize } = data;
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isExportEnabled = useDEMOModelerStore((state) => state.isExportEnabled);

  const scaleX = (width ?? 1) / initialSize.width;
  const scaleY = (height ?? 1) / initialSize.height;

  const scaledPoints = points.map((point) => [
    point[0] * scaleX,
    point[1] * scaleY,
    point[2],
  ]) satisfies Points;

  const path = convertPointsToPath(scaledPoints);

  const [isCornerResizeControl, setCornerSizeControl] = useState(false);

  return (
    <div
      className={cn(
        !isExportEnabled && isEnabled && selected && "outline-1 outline-sky-500"
      )}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        className={cn(selected ? "pointer-events-auto" : "pointer-events-none")}
      >
        <path
          d={path}
          className={"pointer-events-visiblePainted"}
          fill={color}
        />
      </svg>
      <DEMONodeToolbar nodeId={id} actions={["changeColor"]} />
      <NodeResizer
        nodeId={id}
        isVisible={selected && isEnabled && !isExportEnabled && !dragging}
        keepAspectRatio={isCornerResizeControl}
        onResizeStart={(e, params) => {
          const isCornerResizeControl = cornerResizeControlClasses.some(
            (classes) =>
              classes.every((c) => {
                return (e.sourceEvent.target as HTMLElement).classList.contains(
                  c
                );
              })
          );

          setCornerSizeControl(isCornerResizeControl);
        }}
      />
    </div>
  );
};

export default WhiteboardNode;
