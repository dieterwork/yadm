import { EdgeLabelRenderer } from "@xyflow/react";
import { cn } from "@sglara/cn";
import { useEffect, useRef, useState } from "react";
import { updateEdgeData } from "$/features/modeler/store/useDEMOModelerStore";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import type { ObjectFactDiagramEdge } from "../edges.types";

type CardinalityField = keyof NonNullable<
  ObjectFactDiagramEdge["data"]
>["cardinality"];

type Props = {
  edgeId: string;
  field: CardinalityField;
  labelX: number;
  labelY: number;
  content: string;
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
  translateX,
  translateY,
  isEnabled,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null!);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = content ?? "";
  }, []);

  return (
    <EdgeLabelRenderer>
      <div
        className="cardinality | pointer-events-auto isolate absolute nodrag nopan p-1 grid place-items-center"
        style={{
          transform: `translate(${translateX ?? "-50%"}, ${translateY ?? "-50%"}) translate(${labelX}px,${labelY}px)`,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (!isEnabled) return;
          setIsEditing(true);
          setTimeout(() => ref.current?.focus(), 50);
        }}
      >
        <span
          ref={ref}
          contentEditable={isEditing}
          suppressContentEditableWarning
          spellCheck={false}
          className={cn(
            "inline-block text-[12px] outline-none min-w-6 min-h-[12px] leading-[12px]",
            isEditing && "ring-1 ring-sky-500 rounded-sm px-0.5",
          )}
          onInput={(e) => {
            updateEdgeData(edgeId, (data) => ({
              ...data,
              cardinality:
                data && "cardinality" in data && data.cardinality
                  ? {
                      ...data?.cardinality,
                      [field]: e.currentTarget.innerHTML,
                    }
                  : undefined,
            }));
          }}
          onBlur={() => {
            setIsEditing(false);
            takeSnapshotAndSave();
          }}
        />
      </div>
    </EdgeLabelRenderer>
  );
};

export default CardinalityLabel;
