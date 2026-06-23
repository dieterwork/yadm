import EditableContent from "$/features/editable_content/EditableContent";
import { EdgeLabelRenderer } from "@xyflow/react";

type Props = {
  labelX: number;
  labelY: number;
  content: string;
  translateX?: string;
  translateY?: string;
};
const CardinalityLabel = ({
  labelX,
  labelY,
  content,
  translateX,
  translateY,
}: Props) => {
  return (
    <EdgeLabelRenderer>
      <div
        className="isolate absolute p-2 text-sm"
        style={{
          transform: `translate(${translateX ?? "-50%"}, ${translateY ?? "-50%"}) translate(${labelX}px,${labelY}px)`,
        }}
      >
        test
      </div>
    </EdgeLabelRenderer>
  );
};

export default CardinalityLabel;
