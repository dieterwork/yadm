import {
  Handle,
  Position,
  useInternalNode,
  useUpdateNodeInternals,
} from "@xyflow/react";
import type { DEMOHandlesData, DEMONode } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { useNodeHandles } from "./useNodeHandles";
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
  if (!node || !width || !height) return null;
  const handlesWithStyles = useNodeHandles(node.data?.handles, width, height);
  return (
    <div
      className={cn(
        "handles | absolute",
        node.data?.handles.isVisible ? "visible" : "invisible"
      )}
      style={{
        width: width,
        height: height,
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
