import {
  EdgeLabelRenderer,
  Position,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import { cn } from "@sglara/cn";
import { useEffect, useRef, useState } from "react";
import {
  setAction,
  setEdges,
  setNodes,
  updateCardinalityLabel,
} from "$/features/modeler/store/useDEMOModelerStore";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { cardinalityFields, type CardinalityField } from "../edges.types";
import setEndOfContentEditable from "$/features/editable_content/utils/setEndOfContentEditable";
import CardinalityLabelToolbar from "./CardinalityLabelToolbar";
import sanitizeHtml from "sanitize-html";
import { useGesture } from "@use-gesture/react";

type Props = {
  edgeId: string;
  field: CardinalityField;
  labelX: number;
  labelY: number;
  content: string;
  selected?: boolean;
  translateX?: string;
  translateY?: string;
  offsetX?: number;
  offsetY?: number;
  isEnabled?: boolean;
  law?: "precedence" | "exclusion";
};

const CardinalityLabel = ({
  edgeId,
  field,
  labelX,
  labelY,
  content,
  selected,
  translateX,
  translateY,
  offsetX,
  offsetY,
  isEnabled,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null!);
  const [isEditable, setIsEditable] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.innerHTML = sanitizeHtml(content ?? "");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnabled) return;
      if (e.key === "Escape") {
        exit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnabled]);

  const setSelected = (value: boolean) => {
    const cardinalityFieldsNotSelected = cardinalityFields.filter(
      (f) => f !== field,
    );
    updateCardinalityLabel(edgeId, field, {
      selected: value,
    });
    for (const field of cardinalityFieldsNotSelected) {
      updateCardinalityLabel(edgeId, field, {
        selected: false,
      });
    }
  };

  const edit = () => {
    setSelected(false);
    setIsEditable(true);
    setAction("edit");
    setNodes((nodes) =>
      nodes.map((n) => (n.selected ? { ...n, selected: false } : n)),
    );
    setEdges((edges) =>
      edges.map((e) => (e.selected ? { ...e, selected: false } : e)),
    );
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.focus();
      setEndOfContentEditable(ref.current);
    }, 50);
  };

  const exit = () => {
    setIsEditable(false);
    setSelected(false);
    setAction(null);
    takeSnapshotAndSave();
  };

  const { zoom } = useViewport();
  const [isDragging, setDragging] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({ delta: [dx, dy], tap }) => {
        if (tap) return;
        setDragging(true);
        setSelected(true);
        updateCardinalityLabel(edgeId, field, (data) => ({
          offset: {
            x: (data.offset?.x ?? 0) + dx / zoom,
            y: (data.offset?.y ?? 0) + dy / zoom,
          },
        }));
      },
      onDragEnd: ({ xy: [x, y] }) => {
        setDragging(false);
        const position = screenToFlowPosition({
          x,
          y,
        });
        setMenuPosition(position);
      },
      onClick: ({ event: e }) => {
        if (!isEnabled) return;
        e.stopPropagation();
        setSelected(true);
        const position = screenToFlowPosition({
          x: e.clientX,
          y: e.clientY,
        });
        setMenuPosition(position);
        setNodes((nodes) =>
          nodes.map((n) => (n.selected ? { ...n, selected: false } : n)),
        );
        setEdges((edges) =>
          edges.map((e) => (e.selected ? { ...e, selected: false } : e)),
        );
      },
      onDoubleClick: ({ event: e }) => {
        e.preventDefault();
        if (!isEnabled) return;
        if (isEditable) return;
        e.stopPropagation();
        edit();
      },
      onBlur: () => {
        exit();
      },
      onInput: ({ event: e }) => {
        if (!isEnabled) return;
        updateCardinalityLabel(edgeId, field, {
          label:
            e.currentTarget instanceof HTMLElement
              ? e.currentTarget.innerHTML
              : "",
        });
      },
    },
    {
      drag: {
        filterTaps: true,
      },
    },
  );

  return (
    <>
      <EdgeLabelRenderer>
        <div
          className={cn(
            "cardinality | absolute nodrag nopan grid place-items-center p-1",
            isEnabled && !isEditable && "cursor-move",
          )}
          style={{
            transform: `translate(${translateX ?? "-50%"}, ${translateY ?? "-50%"}) translate(${labelX}px,${labelY}px) translate(${offsetX}px,${offsetY}px)`,
            touchAction: "none",
          }}
        >
          <span
            {...bind()}
            ref={ref}
            contentEditable={isEnabled && isEditable}
            suppressContentEditableWarning
            spellCheck={false}
            className={cn(
              "inline-block pointer-events-auto text-[12px] outline-none min-w-6 min-h-[calc(1.2*12px)] leading-[1.2] text-center",
              (selected || isEditable) &&
                "ring-1 ring-sky-500 rounded-sm px-0.5",
              !isEnabled && "pointer-events-none",
            )}
          />
        </div>
      </EdgeLabelRenderer>
      <CardinalityLabelToolbar
        isVisible={selected && isEnabled && !isDragging}
        edgeId={edgeId}
        position={Position.Right}
        xyPosition={menuPosition}
        onEdit={edit}
        onDelete={() => {
          updateCardinalityLabel(edgeId, field, {
            label: "",
          });
          const el = ref.current;
          if (el) {
            el.innerHTML = "";
          }
        }}
        onResetPosition={() => {
          updateCardinalityLabel(edgeId, field, {
            offset: { x: 0, y: 0 },
            selected: false,
          });
        }}
        onClose={() => {
          updateCardinalityLabel(edgeId, field, {
            selected: false,
          });
        }}
      />
    </>
  );
};

export default CardinalityLabel;
