import { cn } from "@sglara/cn";
import {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { useNodeId } from "@xyflow/react";
import { useEditableContent } from "./useEditableContent";

interface EditableContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  width?: number;
  height?: number;
  content?: string;
  editable?: boolean;
  fontSize?: number;
  color?: string;
  maxLines?: number;
  ref?: RefObject<HTMLDivElement>;
  hide?: boolean;
  textAlign?: CSSProperties["textAlign"];
  alignContent?: string;
  maxLength?: number;
}

const getPadding = (fontSize: number) => {
  switch (fontSize) {
    case 10: {
      return "p-2";
    }
    case 12: {
      return "p-2";
    }
    case 14: {
      return "p-2";
    }
    case 16: {
      return "p-2";
    }
    case 18: {
      return "p-2";
    }
    case 20: {
      return "p-2";
    }
    default: {
      return "p-2";
    }
  }
};

const EditableContent = ({
  width,
  height,
  content,
  editable = true,
  fontSize = 14,
  color = "var(--color-black)",
  maxLines = 3,
  ref,
  hide = false,
  textAlign = "center",
  alignContent = "center",
  maxLength,
  ...restProps
}: EditableContentProps) => {
  const nodeId = useNodeId();
  if (!nodeId) throw new Error("No node id found");

  if (!ref) ref = useRef<HTMLDivElement>(null!);
  const { updateNodeContent } = useDEMOModeler(
    useShallow((state) => ({ updateNodeContent: state.updateNodeContent }))
  );
  const classes = cn(
    "editable-content-wrapper | absolute inset-0 m-auto overflow-hidden",
    { "w-full": !width, "h-full": !height },
    // getPadding(fontSize),
    hide && "hidden"
  );

  const props = useEditableContent({
    content,
    ref,
    onContentUpdate: (content) => {
      updateNodeContent(nodeId, content);
    },
    maxLines,
  });

  return (
    <div
      {...restProps}
      className={cn(classes, restProps.className)}
      style={{
        ...restProps.style,
        width,
        height,
        color,
        fontSize,
        textAlign,
      }}
    >
      <div
        ref={ref}
        contentEditable={!!editable}
        suppressContentEditableWarning={true}
        className="block w-full h-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
        style={{ alignContent }}
        {...props}
      ></div>
    </div>
  );
};

export default EditableContent;
