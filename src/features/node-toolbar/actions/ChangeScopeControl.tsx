import {
  getNode,
  updateNodeScope,
} from "$/features/modeler/useDEMOModelerStore";
import { isNodeScope } from "$/features/nodes/utils/isNodeScope";
import type { NodeScope } from "$/features/nodes/nodes.types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";

const scopeOptions = [
  { id: "in", label: "In" },
  { id: "out", label: "Out" },
] satisfies { id: NodeScope; label: string }[];

const ChangeScopeControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!nodeId) return null;
  const [scopeSelected, setScopeSelected] = useState<Selection>(
    new Set([node.data?.scope ?? "in"])
  );
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label="Scope"
        icon={(iconProps) => <ArrowsLeftRightIcon {...iconProps} />}
        menuTrigger
        id="change_scope"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
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
            <DEMOElementToolbarListBoxItem
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
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeScopeControl;
