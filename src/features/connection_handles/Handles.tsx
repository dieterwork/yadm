import {
  getConnectedEdges,
  Position,
  useInternalNode,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { cn } from "@sglara/cn";
import {
  getNode,
  setEdges,
  setNodes,
  updateNodeHandleOffset,
  updateNodeHandles,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import clamp from "$/shared/utils/clamp";
import { useEffect, type MouseEvent } from "react";

interface HandlesProps {
  nodeId: string;
  handles: DEMOHandlesData;
  width?: number;
  height?: number;
  isVisible?: boolean;
}

const Handles = ({ nodeId, width, height }: HandlesProps) => {
  const node = getNode(nodeId);
  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => {
    updateNodeInternals(nodeId);
  }, [updateNodeInternals, nodeId]);

  if (!node || !width || !height || !("handles" in node.data)) return null;

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
          />
        ))}
    </div>
  );
};

export default Handles;
