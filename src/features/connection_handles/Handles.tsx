import { Handle, Position } from "@xyflow/react";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { useNodeHandles } from "./useNodeHandles";
import { cn } from "@sglara/cn";
import { useEffect } from "react";

interface HandlesProps {
  nodeId: string;
  handles: DEMOHandlesData;
  nodeDimensions: { width?: number; height?: number };
  isVisible?: boolean;
}
const Handles = ({
  nodeId,
  handles,
  nodeDimensions,
  isVisible,
}: HandlesProps) => {
  if (!nodeDimensions.width || !nodeDimensions.height) return null;
  handles = useNodeHandles({
    width: nodeDimensions.width,
    height: nodeDimensions.height,
    handles,
  });
  return (
    <div
      className={cn("handles | absolute", isVisible ? "invisible" : "visible")}
      style={{
        width: nodeDimensions.width,
        height: nodeDimensions.height,
      }}
    >
      {handles.top?.handles &&
        handles.top.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Top}
            nodeId={nodeId}
            isConnectable={isVisible}
          />
        ))}
      {handles.bottom?.handles &&
        handles.bottom.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Bottom}
            nodeId={nodeId}
            isConnectable={isVisible}
          />
        ))}
      {handles.left?.handles &&
        handles.left.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Left}
            nodeId={nodeId}
            isConnectable={isVisible}
          />
        ))}
      {handles.right?.handles &&
        handles.right.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Right}
            nodeId={nodeId}
            isConnectable={isVisible}
          />
        ))}
    </div>
  );
};

export default Handles;
