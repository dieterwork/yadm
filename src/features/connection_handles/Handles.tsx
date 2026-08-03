import { Position, useUpdateNodeInternals } from "@xyflow/react";
import type { DEMOHandlesData } from "../nodes/nodes.types";
import DEMOHandle from "./DEMOHandle";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "../modeler/store/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

interface HandlesProps {
  nodeId: string;
  handles: DEMOHandlesData;
  width?: number;
  height?: number;
  isVisible?: boolean;
}

const Handles = ({ nodeId, width, height }: HandlesProps) => {
  const node = useDEMOModelerStore(
    useShallow((state) => state.nodes.find((n) => n.id === nodeId)),
  );
  const updateNodeInternals = useUpdateNodeInternals();

  const isExportEnabled = useDEMOModelerStore((state) => state.isExportEnabled);

  useEffect(() => {
    updateNodeInternals(nodeId);
  }, [updateNodeInternals, nodeId]);

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
      className={cn("handles | absolute")}
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
            derivation={handle.derivation}
            nodeWidth={width}
            nodeHeight={height}
            isVisible={node.data?.handles.isVisible && !isExportEnabled}
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
            derivation={handle.derivation}
            nodeWidth={width}
            nodeHeight={height}
            isVisible={node.data?.handles.isVisible && !isExportEnabled}
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
            derivation={handle.derivation}
            nodeWidth={width}
            nodeHeight={height}
            isVisible={node.data?.handles.isVisible && !isExportEnabled}
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
            derivation={handle.derivation}
            nodeWidth={width}
            nodeHeight={height}
            isVisible={node.data?.handles.isVisible && !isExportEnabled}
          />
        ))}
    </div>
  );
};

export default Handles;
