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
  getNode,
  setEdges,
  setNodes,
  updateNodeHandleOffset,
  updateNodeHandles,
  useDEMOModelerStore,
} from "../modeler/useDEMOModelerStore";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";
import clamp from "$/shared/utils/clamp";
import { type CSSProperties, type MouseEventHandler } from "react";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  canDrag = true,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
  canDrag?: boolean;
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
      if (!isHandleEditModeEnabled || !isEnabled || !id || !canDrag) return;

      event.preventDefault();

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

  const node = getNode(nodeId);
  if (!node) return null;

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const connectedEdges = getConnectedEdges([node], edges).filter((edge) => {
      return edge.sourceHandle === id || edge.targetHandle === id;
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

  const style: CSSProperties = {
    left:
      position === Position.Top || position === Position.Bottom
        ? (offset ?? 0.5) * 100 + "%"
        : undefined,
    top:
      position === Position.Left || position === Position.Right
        ? (offset ?? 0.5) * 100 + "%"
        : undefined,
  };

  if (isHandleEditModeEnabled)
    return (
      <Handle
        {...restProps}
        {...bind()}
        style={style}
        className={cn(
          "demo-handle",
          "touch-none",
          isEnabled &&
            canDrag &&
            (position === Position.Top || position === Position.Bottom) &&
            "cursor-col-resize!",
          isEnabled &&
            canDrag &&
            (position === Position.Right || position === Position.Left) &&
            "cursor-row-resize!",
          isEnabled && !canDrag && "cursor-not-allowed"
        )}
        id={id}
        position={position}
        onContextMenu={onContextMenu}
      />
    );

  return (
    <Handle
      {...restProps}
      style={style}
      className={"demo-handle"}
      id={id}
      position={position}
      onContextMenu={onContextMenu}
    />
  );
};

export default DEMOHandle;
