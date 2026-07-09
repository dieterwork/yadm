import { cn } from "@sglara/cn";

import EditableContent from "../../editable_content/EditableContent";

type Props = {
  content?: string;
  isEditable?: boolean;
  fontSize?: number;
  width?: number;
};

const OrganizationLabel = ({ content, isEditable, fontSize, width }: Props) => {
  const fontSizeValue = fontSize ?? 12;
  const height = Math.ceil(fontSizeValue * 1.2 * 2);

  return (
    <div
      className={cn(
        "pointer-events-auto absolute bottom-full left-1/2 -translate-x-1/2 nodrag nopan",
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
