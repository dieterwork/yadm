import { Handle, Position } from "@xyflow/react";
import type { DEMOHandle, DEMOHandlesData } from "../nodes/nodes.types";

interface HandlesProps {
  handles: DEMOHandlesData;
}
const Handles = ({ handles }: HandlesProps) => {
  if (!handles) return null;
  return (
    <>
      {handles.top?.handles &&
        handles.top.handles.map((params) => (
          <Handle
            key={params.id}
            id={params.id}
            style={params.style}
            type="source"
            position={Position.Top}
          />
        ))}
      {handles.bottom?.handles &&
        handles.bottom.handles.map((params) => (
          <Handle
            key={params.id}
            id={params.id}
            style={params.style}
            type="source"
            position={Position.Bottom}
          />
        ))}
      {handles.left?.handles &&
        handles.left.handles.map((params) => (
          <Handle
            key={params.id}
            id={params.id}
            style={params.style}
            type="source"
            position={Position.Left}
          />
        ))}
      {handles.right?.handles &&
        handles.right.handles.map((params) => (
          <Handle
            key={params.id}
            id={params.id}
            style={params.style}
            type="source"
            position={Position.Right}
          />
        ))}
    </>
  );
};

export default Handles;
