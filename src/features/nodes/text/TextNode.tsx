import EditableContent from "../../editable_content/EditableContent";
import { NodeResizer, type NodeProps } from "@xyflow/react";
import type { TextNode as TextNodeType } from "./textNode.types";
import { cn } from "@sglara/cn";
import NodeToolbar from "../../node-toolbar/DEMONodeToolbar";
import { MIN_SIZE_MAP } from "../utils/consts";

const TextNode = ({
  selected,
  width,
  height,
  data,
  id,
}: NodeProps<TextNodeType>) => {
  const { content, textAlign, alignContent, fontSize, color, isEditable } =
    data;
  return (
    <>
      <div
        className={cn(
          "rounded border-dashed",
          data.isBorderVisible ? "border-1 border-slate-300" : "border-none"
        )}
        style={{ width, height }}
      >
        <NodeToolbar
          nodeId={id}
          actions={[
            "delete",
            "changeFontSize",
            "showBorder",
            "changeColor",
            "showBorder",
            "editText",
          ]}
        />
        <NodeResizer
          isVisible={selected}
          minHeight={MIN_SIZE_MAP["text"].height}
          minWidth={MIN_SIZE_MAP["text"].width}
        />
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          width={width}
          height={height}
          content={content}
          alignContent={alignContent}
          textAlign={textAlign}
          fontSize={fontSize}
          color={color}
        />
      </div>
    </>
  );
};

export default TextNode;
