import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
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

  const handlesWithStyles = useNodeHandles({
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
      {handlesWithStyles.top?.handles &&
        handlesWithStyles.top.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Top}
            nodeId={nodeId}
          />
        ))}
      {handlesWithStyles.bottom?.handles &&
        handlesWithStyles.bottom.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Bottom}
            nodeId={nodeId}
          />
        ))}
      {handlesWithStyles.left?.handles &&
        handlesWithStyles.left.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Left}
            nodeId={nodeId}
          />
        ))}
      {handlesWithStyles.right?.handles &&
        handlesWithStyles.right.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Right}
            nodeId={nodeId}
          />
        ))}
    </div>
  );
};

export default Handles;
