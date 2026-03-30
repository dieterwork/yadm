import { NodeResizer, type NodeProps } from "@xyflow/react";
import type { ShapeNode as ShapeNodeType } from "../nodes.types";
import getSvgPathFromStroke from "$/features/draw/utils/getSvgPathFromStroke";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import DEMONodeToolbar from "$/features/node_toolbar/DEMONodeToolbar";
const ShapeNode = ({
  id,
  width,
  height,
  data,
  selected,
}: NodeProps<ShapeNodeType>) => {
  const { points, color } = data;
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isExportEnabled = useDEMOModelerStore((state) => state.isExportEnabled);

  const pathData = getSvgPathFromStroke(points);

  return (
    <div
      className={cn(
        !isExportEnabled && isEnabled && selected && "outline-1 outline-sky-500"
      )}
      style={{ width, height }}
    >
      <svg width={width} height={height}>
        <path d={pathData} stroke={color} />
      </svg>
      <DEMONodeToolbar
        nodeId={id}
        isVisible={isEnabled && !isExportEnabled}
        actions={["changeColor"]}
      />
      <NodeResizer
        nodeId={id}
        isVisible={selected && isEnabled && !isExportEnabled}
      />
    </div>
  );
};

export default ShapeNode;
