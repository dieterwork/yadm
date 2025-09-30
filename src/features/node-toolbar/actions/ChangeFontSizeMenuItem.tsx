import { updateNodeFontSize } from "$/features/modeler/useDEMOModelerStore";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { TextAaIcon } from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";

const fontSizeOptions = [10, 12, 14, 16, 20, 24].map((num) => ({
  id: num.toString(),
  value: num,
  label: num.toString(),
})) satisfies { id: string; value: number; label: string }[];

const ChangeFontSizeMenuItem = ({ nodeId }: { nodeId: string }) => {
  const [selected, setSelected] = useState<Selection>(
    new Set([fontSizeOptions[3].id])
  );
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Font size"
        icon={({ size, color }) => <TextAaIcon size={size} color={color} />}
        submenuTrigger
        id="change_fontSize"
      />
      <Popover placement="right top" shouldFlip={false}>
        <ToolbarListBox
          aria-labelledby="change_fontSize"
          items={fontSizeOptions}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "number") return;
              updateNodeFontSize(nodeId, entry);
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
            />
          )}
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeFontSizeMenuItem;
