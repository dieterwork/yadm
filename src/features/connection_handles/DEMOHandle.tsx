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
  setHandleEditModeEnabled,
  setNodes,
  updateNode,
  updateNodeHandleOffset,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";
import clamp from "$/shared/utils/clamp";
import { zIndexMap } from "$/shared/utils/zIndex";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type PointerEventHandler,
} from "react";
import { updateHelperLinesFromHandleChanges } from "../helper_lines/useHelperLinesStore";
import deleteHandle from "./utils/deleteHandle";
import DEMOHandleToolbar from "../handle_toolbar/DEMOHandleToolbar";
import useHandleSelectionStore, {
  setSelectedHandleId,
} from "../handle_toolbar/useHandleSelectionStore";
import DerivationHandle from "./DerivationHandle";
import getHandleRotation from "./utils/getHandleRotation";
import getCircularHandlePoint from "./utils/getCircularHandlePoint";
import { getCircularHandleBounds } from "./utils/circularHandleMap";

// how long a handle has to be held before handle edit mode turns on
const HANDLE_HOLD_DELAY = 2000;

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  canDrag = true,
  derivation,
  isVisible = true,
  nodeWidth,
  nodeHeight,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
  canDrag?: boolean;
  derivation?: "aggregation" | "generalisation" | "none";
  isVisible?: boolean;
  nodeWidth: number;
  nodeHeight: number;
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
  const [isHeld, setIsHeld] = useState(false);
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

  const isDraggingHandle = useRef(false);
  const holdTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const canDragHandle = () =>
    isHandleEditModeEnabled && isEnabled && !!id && canDrag;

  const startHandleDrag = () => {
    isDraggingHandle.current = true;
    clearSelectedCardinalityLabels();
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId ? { ...node, selected: false } : node,
      ),
    );
  };

  const bind = useGesture({
    onDragStart: () => {
      if (!canDragHandle()) return;
      startHandleDrag();
    },
    onDragEnd: () => {
      if (!isDraggingHandle.current) return;
      isDraggingHandle.current = false;

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
      if (!canDragHandle() || !id) return;
      if (!isDraggingHandle.current) startHandleDrag();

      event.preventDefault();

      const xyPosition = screenToFlowPosition({ x: xy[0], y: xy[1] });

      const pointer = {
        x: xyPosition.x - (internalNode?.internals.positionAbsolute.x ?? 0),
        y: xyPosition.y - (internalNode?.internals.positionAbsolute.y ?? 0),
      };

      const isDraggedHorizontally =
        position === Position.Top || position === Position.Bottom;
      const size = isDraggedHorizontally ? nodeWidth : nodeHeight;

      const circle = getCircularHandleBounds(
        internalNode?.type,
        nodeWidth,
        nodeHeight,
      );

      let main = isDraggedHorizontally ? pointer.x : pointer.y;
      let isReturning = false;

      if (circle) {
        const radius = { x: circle.width / 2, y: circle.height / 2 };
        const centre = { x: circle.x + radius.x, y: circle.y + radius.y };

        const direction = {
          x: (pointer.x - centre.x) / (radius.x || 1),
          y: (pointer.y - centre.y) / (radius.y || 1),
        };
        const length = Math.hypot(direction.x, direction.y);
        if (!length) return;

        main = isDraggedHorizontally
          ? centre.x + (direction.x / length) * radius.x
          : centre.y + (direction.y / length) * radius.y;

        const isLeadingSide =
          position === Position.Top || position === Position.Left;
        const towardsCross = isDraggedHorizontally ? direction.y : direction.x;
        isReturning = isLeadingSide ? towardsCross > 0 : towardsCross < 0;
      } else {
        main = clamp(main, 0, size);
      }

      let changedOffset = updateHelperLinesFromHandleChanges(
        {
          nodeId,
          offset: main / size,
          position,
          isDragging: true,
        },
        nodes,
      );

      if (circle) {
        const [minMain, spanMain] = isDraggedHorizontally
          ? [circle.x, circle.width]
          : [circle.y, circle.height];

        const swept =
          clamp(changedOffset * size, minMain, minMain + spanMain) - minMain;
        const sweep = (isReturning ? 2 * spanMain - swept : swept) + minMain;

        const turn = (2 * spanMain) / size;
        changedOffset = [-2, -1, 0, 1, 2].reduce((nearest, turns) => {
          const candidate = sweep / size + turns * turn;
          return Math.abs(candidate - offset) < Math.abs(nearest - offset)
            ? candidate
            : nearest;
        }, Infinity);
      }
      setChangedOffset(changedOffset);
      updateNodeHandleOffset(nodeId, id, position, changedOffset);
      updateNodeInternals(nodeId);
    },
  });

  const holdRelease = useRef<AbortController>(undefined);

  const endHold = useCallback(() => {
    if (!holdRelease.current) return;

    clearTimeout(holdTimeout.current);
    holdRelease.current.abort();
    holdRelease.current = undefined;
    setIsHeld(false);
    setHandleEditModeEnabled(false);
  }, []);

  const startHold: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isEnabled || event.button !== 0) return;

    holdTimeout.current = setTimeout(() => {
      setIsHeld(true);
      setHandleEditModeEnabled(true);
    }, HANDLE_HOLD_DELAY);

    holdRelease.current = new AbortController();
    const { signal } = holdRelease.current;
    window.addEventListener("mouseup", endHold, { signal });
    window.addEventListener("touchend", endHold, { signal });
    window.addEventListener("pointercancel", endHold, { signal });
  };

  const gestureProps = bind();
  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    gestureProps.onPointerDown?.(event);
    startHold(event);
  };
  const handleProps = { ...gestureProps, onPointerDown };

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

  const isDraggedHorizontally =
    position === Position.Top || position === Position.Bottom;

  const circularPoint = getCircularHandlePoint({
    type: node.type,
    position,
    offset: offset ?? 0.5,
    width: nodeWidth,
    height: nodeHeight,
  });

  const style: CSSProperties = { zIndex: zIndexMap.handle };

  if (circularPoint) {
    style.left = circularPoint.x;
    style.top = circularPoint.y;
  } else if (isDraggedHorizontally) {
    style.left = (offset ?? 0.5) * 100 + "%";
  } else {
    style.top = (offset ?? 0.5) * 100 + "%";
  }

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
          {...handleProps}
          style={{
            ...style,
            "--_handle-rotation": `${rotation * (180 / Math.PI)}deg`,
          }}
          className={cn(
            "demo-handle",
            "touch-none",
            !!circularPoint && "demo-handle-circular",
            isHeld && "demo-handle-held",
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
          actions={["delete"]}
        />
      </>
    );

  return (
    <>
      <Handle
        {...restProps}
        {...handleProps}
        style={{
          ...style,
          "--_handle-rotation": `${rotation * (180 / Math.PI)}deg`,
        }}
        className={cn(
          "demo-handle",
          !!circularPoint && "demo-handle-circular",
          isHeld && "demo-handle-held",
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
