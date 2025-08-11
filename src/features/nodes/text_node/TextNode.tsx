import { TextField } from "react-aria-components";
import EditableContent from "../../editable_content/EditableContent";
import DEMONodePrimitive from "../DEMONodePrimitive";
import type { NodeProps } from "@xyflow/react";
import type { TextNode as TextNodeType } from "./textNode";

const TextNode = ({
  selected,
  width,
  height,
  data,
  id,
  content,
}: NodeProps<TextNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="text_node"
        actions={["delete", "changeFontSize"]}
      >
        <EditableContent width={width} height={height} content={content} />
      </DEMONodePrimitive>
    </>
  );
};

export default TextNode;
