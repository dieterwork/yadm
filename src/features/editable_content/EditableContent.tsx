import { cn } from "@sglara/cn";
import type { HTMLAttributes } from "react";
import { Input, TextField } from "react-aria-components";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { useNodeId } from "@xyflow/react";

type TextPosition = "top" | "bottom" | "center";

interface EditableContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  width?: number;
  height?: number;
  content?: string[] | string;
  editable?: boolean;
  textPosition?: TextPosition;
  as?: "contentEditable" | "input";
  maxLength?: number;
  size?: "small" | "medium" | "large";
  color?: string;
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

const getPadding = (size: string) => {
  switch (size) {
    case "small": {
      return "p-6";
    }
    case "medium": {
      return "p-4";
    }
    case "large": {
      return "p-2";
    }
    default: {
      throw new Error("Invalid size");
    }
  }
};

const getFontSize = (size: string) => {
  switch (size) {
    case "small": {
      return "text-sm";
    }
    case "medium": {
      return "text-base";
    }
    case "large": {
      return "text-lg";
    }
    default: {
      throw new Error("Invalid size");
    }
  }
};

const EditableContent = ({
  width,
  height,
  content,
  editable = true,
  textPosition = "center",
  as = "contentEditable",
  size = "medium",
  maxLength = 2,
  color = "var(--color-black)",
  ...restProps
}: EditableContentProps) => {
  const classes = cn(
    "editable-content-wrapper | absolute inset-0 m-auto overflow-hidden text-center",
    { "w-full": !width, "h-full": !height },
    getPadding(size),
    getFontSize(size)
  );

  const nodeId = useNodeId();

  const { updateNodeContent, getNode } = useDEMOModeler(
    useShallow((state) => ({
      updateNodeContent: state.updateNodeContent,
      getNode: state.getNode,
    }))
  );

  return (
    <div
      {...restProps}
      className={cn(classes, restProps.className)}
      style={{ ...restProps.style, width, height, color }}
    >
      {as === "contentEditable" ? (
        <div
          contentEditable={!!editable}
          suppressContentEditableWarning={true}
          className="block w-full h-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
          style={{ alignContent: getAlignContentStyle(textPosition) }}
        >
          {typeof content === "string" ? (
            <>
              <div>{content}</div>
            </>
          ) : (
            Array.isArray(content) &&
            content.map((text) => (
              <>
                <div>{text}</div>
              </>
            ))
          )}
        </div>
      ) : (
        typeof content === "string" && (
          <TextField
            className="block w-full h-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
            onChange={(val) => {
              updateNodeContent(nodeId ?? "", val);
            }}
            defaultValue={content}
            maxLength={maxLength}
          >
            <Input
              className="block w-full h-full"
              style={{ textAlign: getAlignContentStyle(textPosition) }}
            />
          </TextField>
        )
      )}
    </div>
  );
};

export default EditableContent;
