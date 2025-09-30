import { updateNodeColor } from "$/features/modeler/useDEMOModelerStore";
import type { NodeScope } from "$/features/nodes/nodes.types";
import type { NodeColor } from "$/shared/components/ui/colors/colors.types";
import { isNodeColor } from "$/shared/components/ui/colors/colors.utils";
import ToolbarColorSwatch from "$/shared/components/ui/toolbar/ToolbarColorSwatch";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { PaintBrushHouseholdIcon } from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";

const colorOptions = [
  { id: "default", label: "Default" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "yellow", label: "Yellow" },
] satisfies { id: NodeColor; label: string }[];

const ChangeColorMenuItem = ({
  nodeId,
  scope,
}: {
  nodeId: string;
  scope?: NodeScope;
}) => {
  const [colorSelected, setColorSelected] = useState<Selection>(
    new Set([colorOptions[0].id])
  );
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Color"
        icon={(iconProps) => <PaintBrushHouseholdIcon {...iconProps} />}
        submenuTrigger
        id="change_color"
      />
      <Popover placement="right top" shouldFlip={false}>
        <ToolbarListBox
          aria-labelledby="change_color"
          items={colorOptions}
          selectedKeys={colorSelected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setColorSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string" || !isNodeColor(entry)) return;
              updateNodeColor(nodeId, entry);
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
              isDisabled={scope === "out"}
              icon={({ size }) => (
                <ToolbarColorSwatch color={item.id} size={size} />
              )}
            />
          )}
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeColorMenuItem;
