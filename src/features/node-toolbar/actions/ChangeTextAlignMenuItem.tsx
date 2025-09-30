import { updateNodeTextAlign } from "$/features/modeler/useDEMOModelerStore";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import {
  isNodeTextAlign,
  type NodeTextAlign,
} from "$/shared/types/react.types";
import {
  AlignCenterVerticalIcon,
  AlignLeftIcon,
  TextAaIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";

const textAlignOptions = [
  {
    id: "start",
    label: "Start",
  },
  {
    id: "center",
    label: "Center",
  },
  {
    id: "end",
    label: "End",
  },
] satisfies { id: NodeTextAlign; label: string }[];

const getIcon = (
  textAlign: "start" | "center" | "end",
  iconProps: { size: number; color: string }
) => {
  switch (textAlign) {
    case "start":
      return <TextAlignLeftIcon {...iconProps} />;
    case "center":
      return <TextAlignCenterIcon {...iconProps} />;
    case "end":
      return <TextAlignRightIcon {...iconProps} />;
    default:
      throw new Error("Invalid text align");
  }
};

const ChangeTextAlignMenuItem = ({ nodeId }: { nodeId: string }) => {
  const [selected, setSelected] = useState<Selection>(
    new Set([textAlignOptions[0].id])
  );
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Align"
        icon={({ size, color }) => <TextAaIcon size={size} color={color} />}
        submenuTrigger
        id="change_textAlign"
      />
      <Popover placement="right top" shouldFlip={false}>
        <ToolbarListBox
          aria-labelledby="change_textAlign"
          items={textAlignOptions}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string" || !isNodeTextAlign(entry)) return;
              updateNodeTextAlign(nodeId, entry);
              updateNodeInternals(nodeId);
            }
          }}
        >
          {(item) => (
            <ToolbarListBoxItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
              icon={(iconProps) => getIcon(item.id, iconProps)}
            />
          )}
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeTextAlignMenuItem;
