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
  const { content, textAlign, alignContent, fontSize } = data;
  return (
    <>
      <div
        className={cn(
          data.isBorderVisible ? "border-1 border-red-500" : "border-none"
        )}
        style={{ width, height }}
      >
        <NodeToolbar
          id={id}
          data={data}
          type="text_node"
          actions={["delete", "changeFontSize", "showBorder"]}
        />
        <NodeResizer
          isVisible={selected}
          minHeight={MIN_SIZE_MAP["text_node"].height}
          minWidth={MIN_SIZE_MAP["text_node"].width}
        />
        <EditableContent
          width={width}
          height={height}
          content={content}
          alignContent={alignContent}
          textAlign={textAlign}
          fontSize={fontSize}
        />
      </div>
    </>
  );
};

export default TextNode;
