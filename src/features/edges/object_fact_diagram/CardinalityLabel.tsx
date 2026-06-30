import { EdgeLabelRenderer, Position } from "@xyflow/react";
import { cn } from "@sglara/cn";
import { useEffect, useRef, useState } from "react";
import {
  setAction,
  setEdges,
  setNodes,
  updateEdgeData,
} from "$/features/modeler/store/useDEMOModelerStore";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import type { ObjectFactDiagramEdge } from "../edges.types";
import setEndOfContentEditable from "$/features/editable_content/utils/setEndOfContentEditable";
import CardinalityLabelToolbar from "./CardinalityLabelToolbar";

type CardinalityField = keyof NonNullable<
  ObjectFactDiagramEdge["data"]
>["cardinality"];

const CARDINALITY_FIELDS: CardinalityField[] = [
  "startLabel0",
  "startLabel1",
  "middleLabel0",
  "middleLabel1",
  "endLabel0",
  "endLabel1",
];

type Props = {
  edgeId: string;
  field: CardinalityField;
  labelX: number;
  labelY: number;
  content: string;
  selected?: boolean;
  translateX?: string;
  translateY?: string;
  isEnabled?: boolean;
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
  isEnabled,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null!);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      ref.current.innerHTML = content ?? "";
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
    updateEdgeData(edgeId, (data) => {
      if (!data || !("cardinality" in data) || !data.cardinality) return data;
      const cardinality = value
        ? Object.fromEntries(
            CARDINALITY_FIELDS.map((f) => [
              f,
              { ...data.cardinality![f], selected: f === field },
            ]),
          )
        : { ...data.cardinality, [field]: { ...data.cardinality[field], selected: false } };
      return { ...data, cardinality };
    });
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

  return (
    <>
      <EdgeLabelRenderer>
        <div
          className="cardinality | pointer-events-auto absolute nodrag nopan p-1 grid place-items-center"
          style={{
            transform: `translate(${translateX ?? "-50%"}, ${translateY ?? "-50%"}) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <span
            ref={ref}
            contentEditable={isEnabled && isEditable}
            suppressContentEditableWarning
            spellCheck={false}
            className={cn(
              "inline-block text-[12px] outline-none min-w-6 min-h-[calc(1.2*12px)] leading-[1.2]",
              (selected || isEditable) &&
                "ring-1 ring-sky-500 rounded-sm px-0.5",
            )}
            onInput={(e) => {
              if (!isEnabled) return;
              updateEdgeData(edgeId, (data) => {
                if (!data || !("cardinality" in data) || !data.cardinality) return data;
                return {
                  ...data,
                  cardinality: {
                    ...data.cardinality,
                    [field]: { ...data.cardinality[field], label: e.currentTarget.innerHTML },
                  },
                };
              });
            }}
            onClick={(e) => {
              if (!isEnabled) return;
              e.stopPropagation();
              setSelected(true);
              setNodes((nodes) =>
                nodes.map((n) => (n.selected ? { ...n, selected: false } : n)),
              );
              setEdges((edges) =>
                edges.map((e) => (e.selected ? { ...e, selected: false } : e)),
              );
            }}
            onDoubleClick={(e) => {
              e.preventDefault();
              if (!isEnabled) return;
              if (isEditable) return;
              e.stopPropagation();
              edit();
            }}
            onBlur={() => {
              exit();
            }}
          />
        </div>
      </EdgeLabelRenderer>
      <CardinalityLabelToolbar
        isVisible={selected && isEnabled}
        edgeId={edgeId}
        position={Position.Right}
        xyPosition={{ x: labelX, y: labelY }}
        onEdit={edit}
        onClose={() => {
          updateEdgeData(edgeId, (data) => {
            if (!data || !("cardinality" in data) || !data.cardinality) return data;
            return {
              ...data,
              cardinality: {
                ...data.cardinality,
                [field]: { label: "", selected: false },
              },
            };
          });
          ref.current.innerHTML = "";
          takeSnapshotAndSave();
        }}
      />
    </>
  );
};

export default CardinalityLabel;
