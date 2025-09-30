import { updateNodeScope } from "$/features/modeler/useDEMOModelerStore";
import parseScope, { isNodeScope } from "$/features/nodes/utils/isNodeScope";
import type { NodeScope } from "$/features/nodes/nodes.types";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";

const scopeOptions = [
  { id: "in", label: "In" },
  { id: "out", label: "Out" },
] satisfies { id: NodeScope; label: string }[];
const ChangeScopeMenuItem = ({
  nodeId,
  scope,
}: {
  nodeId: string;
  scope: NodeScope;
}) => {
  const [scopeSelected, setScopeSelected] = useState<Selection>(
    new Set([scope ?? "in"])
  );
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Scope"
        icon={(iconProps) => <ArrowsLeftRightIcon {...iconProps} />}
        submenuTrigger
        id="change_scope"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <ToolbarListBox
          aria-labelledby="change_scope"
          items={scopeOptions}
          selectedKeys={scopeSelected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setScopeSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string" || !isNodeScope(entry)) return;
              updateNodeScope(nodeId, entry);
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
              icon={(iconProps) => {
                const Icon = item.id === "in" ? ArrowLeftIcon : ArrowRightIcon;
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeScopeMenuItem;
