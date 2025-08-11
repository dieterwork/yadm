import { cn } from "@sglara/cn";
import {
  useEffect,
  useRef,
  type FormEvent,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { Input, TextField } from "react-aria-components";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { useNodeId } from "@xyflow/react";
import { useEditableContent } from "./useEditableContent";

type TextPosition = "top" | "bottom" | "center";

interface EditableContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  width?: number;
  height?: number;
  content?: string;
  editable?: boolean;
  textPosition?: TextPosition;
  fontSize?: number;
  color?: string;
  maxLines?: number;
  ref?: RefObject<HTMLDivElement>;
}

const getAlignContentStyle = (textPosition: TextPosition) => {
  switch (textPosition) {
    case "top": {
      return "start";
    }
    case "bottom": {
      return "end";
    }
    case "center": {
      return "center";
    }
    default: {
      throw new Error("Invalid textPosition value");
    }
  }
};

const getPadding = (fontSize: number) => {
  switch (fontSize) {
    case 10: {
      return "p-6";
    }
    case 12: {
      return "p-6";
    }
    case 14: {
      return "p-4";
    }
    case 16: {
      return "p-2";
    }
    case 18: {
      return "p-2";
    }
    case 20: {
      return "p-1";
    }
    default: {
      return "p-4";
    }
  }
};

const EditableContent = ({
  width,
  height,
  content,
  editable = true,
  textPosition = "center",
  fontSize = 14,
  color = "var(--color-black)",
  maxLines = 3,
  ref,
  ...restProps
}: EditableContentProps) => {
  const nodeId = useNodeId();
  if (!nodeId) throw new Error("No node id found");

  if (!ref) ref = useRef<HTMLDivElement>(null!);
  const { updateNodeContent } = useDEMOModeler(
    useShallow((state) => ({ updateNodeContent: state.updateNodeContent }))
  );
  const classes = cn(
    "editable-content-wrapper | absolute inset-0 m-auto overflow-hidden text-center",
    { "w-full": !width, "h-full": !height },
    getPadding(fontSize)
  );

  const { onInput, onKeyDown } = useEditableContent({
    content,
    ref,
    onContentUpdate: (content) => {
      updateNodeContent(nodeId, content);
    },
  });

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div
      {...restProps}
      className={cn(classes, restProps.className)}
      style={{ ...restProps.style, width, height, color, fontSize }}
    >
      <div
        ref={ref}
        contentEditable={!!editable}
        suppressContentEditableWarning={true}
        className="block w-full h-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
        style={{ alignContent: getAlignContentStyle(textPosition) }}
        onKeyDown={onKeyDown}
        onInput={onInput}
      ></div>
    </div>
  );
};

export default EditableContent;
