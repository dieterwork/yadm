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
  setNodes,
  updateNode,
  updateNodeHandleOffset,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";
import { useGesture } from "@use-gesture/react";
import { cn } from "@sglara/cn";
import clamp from "$/shared/utils/clamp";
import { useState, type CSSProperties, type MouseEventHandler } from "react";
import { updateHelperLinesFromHandleChanges } from "../helper_lines/useHelperLinesStore";
import deleteHandle from "./utils/deleteHandle";
import DEMOHandleToolbar from "../handle_toolbar/DEMOHandleToolbar";
import AggregationHandle from "./AggregationHandle";
import GeneralisationHandle from "./GeneralisationHandle";
import useHandleSelectionStore, {
  setSelectedHandleId,
} from "../handle_toolbar/useHandleSelectionStore";
import getDEMOHandleToolbarPosition from "./utils/getDEMOHandleToolbarPosition";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  offset,
  canDrag = true,
  derivation,
  ...restProps
}: Omit<HandleProps, "onDragStart" | "onDrag" | "onDragEnd"> & {
  nodeId: string;
  offset: number;
  canDrag?: boolean;
  derivation?: "aggregation" | "generalisation" | "none";
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

  const bind = useGesture({
    onDragStart: () => {
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

    if (e.shiftKey) {
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
  };

  if (isHandleEditModeEnabled)
    return (
      <>
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
            isEnabled && !canDrag && "cursor-not-allowed",
            !isEnabled && "nodrag pointer-events-none",
          )}
          id={id}
          position={position}
          onContextMenu={onContextMenu}
        >
          {derivation === "aggregation" && (
            <AggregationHandle position={position} />
          )}
          {derivation === "generalisation" && (
            <GeneralisationHandle position={position} />
          )}
        </Handle>
        <DEMOHandleToolbar
          nodeId={nodeId}
          handleId={id}
          position={position}
          isVisible={selectedHandleId === id}
          actions={["delete"].concat(
            node.type === "entity_type" ? ["changeDerivation"] : [],
          )}
        />
      </>
    );

  return (
    <>
      <Handle
        {...restProps}
        style={style}
        className={cn(
          "demo-handle",
          !isEnabled && "nopan nodrag pointer-events-none",
        )}
        id={id}
        position={position}
        onContextMenu={onContextMenu}
      >
        {derivation === "aggregation" && (
          <AggregationHandle position={position} />
        )}
        {derivation === "generalisation" && (
          <GeneralisationHandle position={position} />
        )}
      </Handle>
      <DEMOHandleToolbar
        nodeId={nodeId}
        handleId={id}
        position={position}
        isVisible={selectedHandleId === id}
        actions={["delete"].concat(
          node.type === "entity_type" ? ["changeDerivation"] : [],
        )}
      />
    </>
  );
};

export default DEMOHandle;
