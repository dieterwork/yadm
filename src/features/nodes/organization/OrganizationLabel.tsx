import { cn } from "@sglara/cn";

import EditableContent from "../../editable_content/EditableContent";

type Props = {
  content?: string;
  isEditable?: boolean;
  fontSize?: number;
  /** Width of the organization node, so the label centers above it. */
  width?: number;
};

// Editable label rendered above an organization node. Uses the shared
// EditableContent so it is driven by the node's `editText` / `changeFontSize`
// toolbar actions and persists to `data.content`.
const OrganizationLabel = ({ content, isEditable, fontSize, width }: Props) => {
  const fontSizeValue = fontSize ?? 12;
  const height = Math.ceil(fontSizeValue * 1.2 * 2); // up to two lines

  return (
    <div
      className={cn(
        "pointer-events-auto absolute bottom-full left-1/2 mb-2 -translate-x-1/2 nodrag nopan",
        isEditable && "outline outline-sky-500 rounded-sm",
      )}
      style={{ width, height }}
    >
      <EditableContent
        isEditable={isEditable}
        width={width}
        height={height}
        content={content}
        fontSize={fontSizeValue}
        textAlign="center"
        alignContent="center"
        padding={0}
        maxLength={100}
        maxLines={2}
      />
    </div>
  );
};

export default OrganizationLabel;
