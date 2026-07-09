import {
  getNode,
  updateNodeFocus,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { NodeFocus } from "$/features/nodes/nodes.types";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { isNodeFocus } from "$/features/nodes/utils/isNodeFocus";

const ChangeFocusControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node) return null;

  const options = [
    { id: "in", label: t(($) => $["In"]) },
    { id: "out", label: t(($) => $["Out"]) },
  ] satisfies { id: NodeFocus; label: string }[];

  const selected = new Set([
    "focus" in node.data && node.data.focus ? node.data.focus : options[0].id,
  ]);

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Focus"])}
        icon={(iconProps) => <ArrowsLeftRightIcon {...iconProps} />}
        menuTrigger
        id="change_focus"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_focus"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string" || !isNodeFocus(entry)) return;
              updateNodeFocus(nodeId, entry);
              takeSnapshotAndSave();
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

export default ChangeFocusControl;
