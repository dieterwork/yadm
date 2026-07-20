import {
  Handle,
  Position,
  useInternalNode,
  useNodeConnections,
  useReactFlow,
  useUpdateNodeInternals,
  type HandleProps,
} from "@xyflow/react";
import {
  clearSelectedCardinalityLabels,
  getNode,
  setNodes,
  updateNode,
  updateNodeHandleOffset,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";
import clamp from "$/shared/utils/clamp";
import { zIndexMap } from "$/shared/utils/zIndex";
import { useState, type CSSProperties, type MouseEventHandler } from "react";
import { updateHelperLinesFromHandleChanges } from "../helper_lines/useHelperLinesStore";
import deleteHandle from "./utils/deleteHandle";
import DEMOHandleToolbar from "../handle_toolbar/DEMOHandleToolbar";
import useHandleSelectionStore, {
  setSelectedHandleId,
} from "../handle_toolbar/useHandleSelectionStore";
import DerivationHandle from "./DerivationHandle";
import getHandleRotation from "./utils/getHandleRotation";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  canDrag = true,
  derivation,
  isVisible = true,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
  canDrag?: boolean;
  derivation?: "aggregation" | "generalisation" | "none";
  isVisible?: boolean;
}) => {
  const isHandleEditModeEnabled = useDEMOModelerStore(
    (state) => state.isHandleEditModeEnabled,
  );
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const edges = useDEMOModelerStore((state) => state.edges);

  const { screenToFlowPosition } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const internalNode = useInternalNode(nodeId);
  const [changedOffset, setChangedOffset] = useState(offset);
  const selectedHandleId = useHandleSelectionStore(
    (state) => state.selectedHandleId,
  );

  const sourceConnections = useNodeConnections({
    nodeId,
    handleId: id,
    handleType: "source",
  });
  const targetConnections = useNodeConnections({
    nodeId,
    handleId: id,
    handleType: "target",
  });

  const connections = [...sourceConnections, ...targetConnections];

  const edgeIds = connections.map((c) => c.edgeId);
  const connectedEdges = edges.filter((edge) => edgeIds.includes(edge.id));

  const bind = useGesture({
    onDragStart: () => {
      clearSelectedCardinalityLabels();
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId ? { ...node, selected: false } : node,
        ),
      );
    },
    onDragEnd: () => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId ? { ...node, selected: !node.selected } : node,
        ),
      );
      updateHelperLinesFromHandleChanges(
        {
          nodeId,
          offset: changedOffset,
          position,
          isDragging: false,
        },
        nodes,
      );
    },
    onDrag: ({ event, xy }) => {
      if (!isHandleEditModeEnabled || !isEnabled || !id || !canDrag) return;

      event.preventDefault();

      const xyPosition = screenToFlowPosition({ x: xy[0], y: xy[1] });
      let changedOffset;
      if (position === Position.Top || position === Position.Bottom) {
        // x movement

        const minX = 0;
        const maxX = internalNode?.measured.width ?? 0;
        const xPosition =
          xyPosition.x - (internalNode?.internals.positionAbsolute.x ?? 0);

        // Get clamped offset
        const offsetClamp = clamp(minX, xPosition, maxX);

        // Divide offset by total width to get percentage
        changedOffset = offsetClamp / (internalNode?.measured.width ?? 0);
      } else {
        // y movement
        const minY = 0;
        const maxY = internalNode?.measured.height ?? 0;
        const yPosition =
          xyPosition.y - (internalNode?.internals.positionAbsolute.y ?? 0);

        // Get clamped offset
        const offsetClamp = clamp(minY, yPosition, maxY);

        // Divide offset by total width to get percentage
        changedOffset = offsetClamp / (internalNode?.measured.height ?? 0);
      }
      changedOffset = updateHelperLinesFromHandleChanges(
        {
          nodeId,
          offset: changedOffset,
          position,
          isDragging: true,
        },
        nodes,
      );
      setChangedOffset(changedOffset);
      updateNodeHandleOffset(nodeId, id, position, changedOffset);
      updateNodeInternals(nodeId);
    },
  });

  const node = getNode(nodeId);
  if (!node) return null;

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (!id) return;

    if (e.ctrlKey || e.metaKey) {
      deleteHandle(id, position, nodeId, edges, updateNodeInternals);
    } else {
      setSelectedHandleId(id);
      updateNode(nodeId, (node) => ({ ...node, selected: false }));
    }
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
    zIndex: zIndexMap.handle,
  };

  const selectedEdgeId =
    connectedEdges.find(
      (e) => e.data && "linePath" in e.data && e.data.linePath === "straight",
    )?.id ?? connectedEdges[0]?.id;

  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  const sourceNode = useInternalNode(selectedEdge?.source ?? "");
  const targetNode = useInternalNode(selectedEdge?.target ?? "");

  const sourceXYPosition = sourceNode?.internals.positionAbsolute ?? {
    x: 0,
    y: 0,
  };
  const targetXYPosition = targetNode?.internals.positionAbsolute ?? {
    x: 0,
    y: 0,
  };

  const sourceH = sourceNode?.internals.handleBounds?.source?.find(
    (h) => h.id === selectedEdge?.sourceHandle,
  );
  const targetH = targetNode?.internals.handleBounds?.source?.find(
    (h) => h.id === selectedEdge?.targetHandle,
  );

  const sourceX =
    sourceXYPosition.x + (sourceH?.x ?? 0) + (sourceH?.width ?? 0) / 2;
  const sourceY =
    sourceXYPosition.y + (sourceH?.y ?? 0) + (sourceH?.height ?? 0) / 2;
  const targetX =
    targetXYPosition.x + (targetH?.x ?? 0) + (targetH?.width ?? 0) / 2;
  const targetY =
    targetXYPosition.y + (targetH?.y ?? 0) + (targetH?.height ?? 0) / 2;

  const rotation = getHandleRotation({
    source: { x: sourceX, y: sourceY },
    target: { x: targetX, y: targetY },
    sourcePosition: sourceH?.position ?? Position.Left,
    targetPosition: targetH?.position ?? Position.Right,
    linePath:
      selectedEdge?.data &&
      "linePath" in selectedEdge.data &&
      selectedEdge.data.linePath
        ? selectedEdge.data.linePath
        : undefined,
    derivation,
  });

  const nodeAbs = internalNode?.internals.positionAbsolute ?? { x: 0, y: 0 };
  const thisHandleBounds =
    internalNode?.internals.handleBounds?.source?.find((h) => h.id === id) ??
    internalNode?.internals.handleBounds?.target?.find((h) => h.id === id);
  const dotX =
    nodeAbs.x + (thisHandleBounds?.x ?? 0) + (thisHandleBounds?.width ?? 0) / 2;
  const dotY =
    nodeAbs.y +
    (thisHandleBounds?.y ?? 0) +
    (thisHandleBounds?.height ?? 0) / 2;

  if (isHandleEditModeEnabled)
    return (
      <>
        <Handle
          {...restProps}
          {...bind()}
          style={{
            ...style,
            "--_handle-rotation": `${rotation * (180 / Math.PI)}deg`,
          }}
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
            isEnabled && !canDrag && "cursor-not-allowed",
            !isEnabled && "nodrag pointer-events-none",
            !isVisible ? "before:invisible" : "before:visible",
          )}
          data-line-path={
            selectedEdge?.data &&
            "linePath" in selectedEdge.data &&
            selectedEdge?.data.linePath
              ? selectedEdge?.data.linePath
              : "step"
          }
          id={id}
          position={position}
          onContextMenu={onContextMenu}
        >
          <DerivationHandle derivation={derivation} position={position} />
        </Handle>
        <DEMOHandleToolbar
          nodeId={nodeId}
          handleId={id}
          position={position}
          isVisible={selectedHandleId === id && isEnabled}
          actions={["delete"].concat()}
        />
      </>
    );

  return (
    <>
      <Handle
        {...restProps}
        style={{
          ...style,
          "--_handle-rotation": `${rotation * (180 / Math.PI)}deg`,
        }}
        className={cn(
          "demo-handle",
          !isEnabled && "nopan nodrag pointer-events-none",
          !isVisible ? "before:invisible" : "before:visible",
        )}
        data-line-path={
          selectedEdge?.data &&
          "linePath" in selectedEdge.data &&
          selectedEdge?.data.linePath
            ? selectedEdge?.data.linePath
            : "step"
        }
        data-handle-id={id}
        id={id}
        position={position}
        onContextMenu={onContextMenu}
      >
        <DerivationHandle
          derivation={derivation}
          position={position}
          xyPosition={{ x: dotX, y: dotY }}
        />
      </Handle>
      <DEMOHandleToolbar
        nodeId={nodeId}
        handleId={id}
        position={position}
        isVisible={selectedHandleId === id}
      />
    </>
  );
};

export default DEMOHandle;
