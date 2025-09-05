import { Handle, Position } from "@xyflow/react";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { useNodeHandles } from "./useNodeHandles";

interface HandlesProps {
  nodeId: string;
  handles: DEMOHandlesData;
  nodeDimensions: { width?: number; height?: number };
}
const Handles = ({ nodeId, handles, nodeDimensions }: HandlesProps) => {
  if (!nodeDimensions.width || !nodeDimensions.height) return null;
  handles = useNodeHandles({
    width: nodeDimensions.width,
    height: nodeDimensions.height,
    handles,
  });
  return (
    <>
      {handles.top?.handles &&
        handles.top.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Top}
            nodeId={nodeId}
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
          />
        ))}
    </>
  );
};

export default Handles;
