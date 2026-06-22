import { cn } from "@sglara/cn";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
  type RefObject,
} from "react";
import {
  updateNodeContent,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";
import { useNodeId } from "@xyflow/react";
import { useEditableContent } from "./useEditableContent";
import takeSnapshotAndSave from "../actions/undo/takeSnapshotAndSave";

interface EditableContentProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "content"
> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  content?: string;
  isEditable?: boolean;
  isSelected?: boolean;
  fontSize?: number;
  color?: string;
  maxLines?: number;
  ref?: Ref<HTMLSpanElement>;
  hide?: boolean;
  textAlign?: CSSProperties["textAlign"];
  alignContent?: string;
  maxLength?: number;
  leading?: number;
  padding?: number;
  contentLocation?: "header" | "body";
  fitContent?: boolean;
  relative?: boolean;
}

const getPadding = (fontSize: number) => {
  switch (fontSize) {
    case 10: {
      return "p-1";
    }
    case 12: {
      return "p-1";
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
  isEditable,
  fontSize = 14,
  color = "var(--color-slate-900)",
  maxLines = 3,
  maxLength = 50,
  leading = 1.2,
  ref,
  hide = false,
  textAlign = "center",
  alignContent = "center",
  padding,
  contentLocation = "body",
  fitContent,
  relative,
  ...restProps
}: EditableContentProps) => {
  const nodeId = useNodeId();
  if (!nodeId) throw new Error("No node id found");
  if (!ref) ref = useRef<HTMLDivElement>(null!);

  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const props = useEditableContent({
    content,
    ref,
    onContentUpdate: (content) => {
      updateNodeContent(nodeId, {
        [contentLocation]: content,
      });
      takeSnapshotAndSave();
    },
    maxLines,
    maxLength,
    leading,
    nodeId,
    fontSize,
    textAlign,
  });

  const isContentEditable = !!isEditable && isEnabled;

  useEffect(() => {
    ref.current.innerHTML = content ?? "";
  }, []);

  return (
    <>
      <div
        {...restProps}
        className={cn(
          "editable-content-wrapper | inset-0 m-auto overflow-hidden",
          { "w-full": !width, "h-full": !height },
          !padding && getPadding(fontSize),
          hide && "hidden",
          isEditable && "outline outline-sky-500 -outline-offset-4",
          relative ? "relative" : "absolute",
          restProps.className,
        )}
        style={{
          ...restProps.style,
          width,
          height,
          container: "editable-content / size",
          padding,
        }}
      >
        <span
          {...props}
          ref={ref}
          spellCheck={false}
          suppressContentEditableWarning={true}
          contentEditable={isContentEditable}
          className={cn(
            "editable-content | inline-block w-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none empty:caret-transparent before:absolute before:inset-0 before:m-auto before:w-full before:h-full before:content-['...'] before:place-items-center before:hidden before:pointer-events-none empty:before:grid before:text-slate-500 [&[contenteditable=false]::before]:hidden",
            fitContent ? "h-fit" : "h-full",
          )}
          style={{
            alignContent,
            color,
            fontSize,
            textAlign,
            lineHeight: leading,
          }}
        ></span>
      </div>
    </>
  );
};

export default EditableContent;
