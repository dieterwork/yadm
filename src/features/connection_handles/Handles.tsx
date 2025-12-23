import { Position } from "@xyflow/react";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { cn } from "@sglara/cn";
import { getNode } from "../modeler/useDEMOModelerStore";

interface HandlesProps {
  nodeId: string;
  handles: DEMOHandlesData;
  width?: number;
  height?: number;
  isVisible?: boolean;
}

const Handles = ({ nodeId, width, height }: HandlesProps) => {
  const node = getNode(nodeId);

  if (
    !node ||
    !width ||
    !height ||
    !("handles" in node.data) ||
    !node.data.handles
  )
    return null;

  return (
    <div
      className={cn(
        "handles | absolute",
        node.data?.handles.isVisible ? "visible" : "invisible"
      )}
      style={{
        width,
        height,
      }}
    >
      {node.data.handles.top?.handles &&
        node.data.handles.top.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Top}
            nodeId={nodeId}
            offset={handle.offset}
            canDrag={handle.canDrag}
          />
        ))}
      {node.data.handles.bottom?.handles &&
        node.data.handles.bottom.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Bottom}
            nodeId={nodeId}
            offset={handle.offset}
            canDrag={handle.canDrag}
          />
        ))}
      {node.data.handles.left?.handles &&
        node.data.handles.left.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Left}
            nodeId={nodeId}
            offset={handle.offset}
            canDrag={handle.canDrag}
          />
        ))}
      {node.data.handles.right?.handles &&
        node.data.handles.right.handles.map((handle) => (
          <DEMOHandle
            key={handle.id}
            id={handle.id}
            style={handle.style}
            type="source"
            position={Position.Right}
            nodeId={nodeId}
            offset={handle.offset}
            canDrag={handle.canDrag}
          />
        ))}
    </div>
  );
};

export default Handles;
