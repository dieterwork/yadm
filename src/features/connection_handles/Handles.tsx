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

let didInit = false;

const Handles = ({ nodeId, width, height }: HandlesProps) => {
  const node = getNode(nodeId);
  const internalNode = useInternalNode(nodeId);
  const updateNodeInternals = useUpdateNodeInternals();
  const edges = useDEMOModelerStore((state) => state.edges);
  const { screenToFlowPosition } = useReactFlow();
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      updateNodeInternals(nodeId);
    }
  }, []);
  if (!node || !internalNode || !width || !height || !("handles" in node.data))
    return null;

  const onDragStart = (e: {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    xy: [number, number];
  }) => {};

  const onDrag = (
    {
      xy,
    }: {
      event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
      xy: [number, number];
    },
    position: Position,
    id: string
  ) => {
    const xyPosition = screenToFlowPosition({ x: xy[0], y: xy[1] });
    if (position === Position.Top || position === Position.Bottom) {
      // x movement

      const minX = 0;
      const maxX = internalNode?.measured.width ?? 0;
      const xPosition =
        xyPosition.x - (internalNode?.internals.positionAbsolute.x ?? 0);

      // Get clamped offset
      const offsetClamp = clamp(minX, xPosition, maxX);

      // Divide offset by total width to get percentage
      const _offset = offsetClamp / (internalNode?.measured.width ?? 0);

      updateNodeHandleOffset(nodeId, id, position, _offset);
    } else {
      // y movement
      const minY = 0;
      const maxY = internalNode?.measured.height ?? 0;
      const yPosition =
        xyPosition.y - (internalNode?.internals.positionAbsolute.y ?? 0);

      // Get clamped offset
      const offsetClamp = clamp(minY, yPosition, maxY);

      // Divide offset by total width to get percentage
      const _offset = offsetClamp / (internalNode?.measured.height ?? 0);

      updateNodeHandleOffset(nodeId, id, position, _offset);
    }
    updateNodeInternals(nodeId);
  };

  const onDragEnd = (e: {
    event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent;
    xy: [number, number];
  }) => {};

  const onContextMenu = (e: MouseEvent, position: Position, id: string) => {
    e.preventDefault();
    const connectedEdges = getConnectedEdges([node], edges).filter((edge) => {
      edge.sourceHandle === id || edge.targetHandle === id;
    });

    const targetNodes = connectedEdges.map((edge) => edge.target);

    if (connectedEdges) {
      setEdges((edges) =>
        edges.filter((edge) => !connectedEdges.includes(edge))
      );
    }

    if (targetNodes) {
      setNodes((nodes) =>
        nodes.filter(
          (node) => !targetNodes.includes(node.id) && node.type !== "ghost"
        )
      );
    }

    updateNodeHandles(nodeId, position, (handles) =>
      handles.filter((handle) => handle.id !== id)
    );
    updateNodeInternals(nodeId);
  };

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
            onContextMenu={(e) => onContextMenu(e, Position.Top, handle.id)}
            onDragStart={(e) => onDragStart(e)}
            onDrag={(e) => onDrag(e, Position.Top, handle.id)}
            onDragEnd={(e) => onDragEnd(e)}
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
            onContextMenu={(e) => onContextMenu(e, Position.Bottom, handle.id)}
            onDragStart={(e) => onDragStart(e)}
            onDrag={(e) => onDrag(e, Position.Bottom, handle.id)}
            onDragEnd={(e) => onDragEnd(e)}
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
            onContextMenu={(e) => onContextMenu(e, Position.Left, handle.id)}
            onDragStart={(e) => onDragStart(e)}
            onDrag={(e) => onDrag(e, Position.Left, handle.id)}
            onDragEnd={(e) => onDragEnd(e)}
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
            onContextMenu={(e) => onContextMenu(e, Position.Right, handle.id)}
            onDragStart={(e) => onDragStart(e)}
            onDrag={(e) => onDrag(e, Position.Right, handle.id)}
            onDragEnd={(e) => onDragEnd(e)}
          />
        ))}
    </div>
  );
};

export default Handles;
