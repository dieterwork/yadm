import { cn } from "@sglara/cn";
import type { HTMLAttributes } from "react";

type TextPosition = "top" | "bottom" | "center";

interface EditableContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  width?: number;
  height?: number;
  content?: string[];
  editable?: boolean;
  textPosition?: TextPosition;
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

const EditableContent = ({
  width,
  height,
  content,
  editable = true,
  textPosition = "center",
  ...restProps
}: EditableContentProps) => {
  const classes = cn(
    "editable-content-wrapper | absolute inset-0 m-auto p-4 overflow-hidden text-center",
    { "w-full": !width, "h-full": !height }
  );
  return (
    <div
      {...restProps}
      className={cn(classes, restProps.className)}
      style={{ ...restProps.style, width, height }}
    >
      <div
        contentEditable={!!editable}
        suppressContentEditableWarning={true}
        className="block w-full h-full break-all overflow-hidden focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
        style={{ alignContent: getAlignContentStyle(textPosition) }}
      >
        {content &&
          content.map((text) => (
            <>
              <div>{text}</div>
            </>
          ))}
      </div>
    </div>
  );
};

export default EditableContent;
