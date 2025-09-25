import { TextField } from "react-aria-components";
import EditableContent from "../../editable_content/EditableContent";
import DEMONodePrimitive from "../DEMONodePrimitive";
import { NodeResizer, type NodeProps } from "@xyflow/react";
import type { TextNode as TextNodeType } from "./textNode.types";
import { cn } from "@sglara/cn";
import NodeToolbar from "../../node-toolbar/NodeToolbar";
import { MIN_SIZE_MAP } from "../utils/consts";

const TextNode = ({
  selected,
  width,
  height,
  data,
  id,
}: NodeProps<TextNodeType>) => {
  const { content, textAlign, alignContent, fontSize, color } = data;
  return (
    <>
      <div
        className={cn(
          "rounded",
          data.isBorderVisible ? "border-1 border-slate-300" : "border-none"
        )}
        style={{ width, height }}
      >
        <NodeToolbar
          id={id}
          data={data}
          type="text"
          actions={["delete", "changeFontSize", "showBorder", "changeColor"]}
        />
        <NodeResizer
          isVisible={selected}
          minHeight={MIN_SIZE_MAP["text"].height}
          minWidth={MIN_SIZE_MAP["text"].width}
        />
        <EditableContent
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
