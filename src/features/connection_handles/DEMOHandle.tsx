import {
  getConnectedEdges,
  Handle,
  Position,
  useInternalNode,
  useReactFlow,
  useUpdateNodeInternals,
  type HandleProps,
} from "@xyflow/react";
import {
  setEdges,
  setNodes,
  updateNodeHandleOffset,
  updateNodeHandles,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";
import clamp from "$/shared/utils/clamp";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
}) => {
  const isHandleEditModeEnabled = useDEMOModelerStore(
    (state) => state.isHandleEditModeEnabled
  );
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const { screenToFlowPosition } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const internalNode = useInternalNode(nodeId);
  const edges = useDEMOModelerStore((state) => state.edges);

  const bind = useGesture({
    onDrag: ({ event, xy }) => {
      if (!isHandleEditModeEnabled) return;
      if (!isEnabled) return;
      if (!id) return;
      event.preventDefault();
      event.stopPropagation();

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
    },
  });

  return (
    <Handle
      {...restProps}
      {...(bind() as any)}
      style={{
        left:
          position === Position.Top || position === Position.Bottom
            ? (offset ?? 0.5) * 100 + "%"
            : undefined,
        top:
          position === Position.Left || position === Position.Right
            ? (offset ?? 0.5) * 100 + "%"
            : undefined,
      }}
      className={cn(
        "demo-handle",
        isHandleEditModeEnabled &&
          isEnabled &&
          (position === Position.Top || position === Position.Bottom) &&
          "cursor-col-resize!",
        isHandleEditModeEnabled &&
          isEnabled &&
          (position === Position.Right || position === Position.Left) &&
          "cursor-row-resize!"
      )}
      id={id}
      position={position}
      onContextMenu={(e) => {
        e.preventDefault();
        const connectedEdges = getConnectedEdges([node], edges).filter(
          (edge) => {
            edge.sourceHandle === id || edge.targetHandle === id;
          }
        );

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
      }}
    />
  );
};

export default DEMOHandle;
