import {
  getNode,
  updateNodeColor,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarColorSwatch from "$/shared/components/ui/element_toolbar/DEMOElementToolbarColorSwatch";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import { PaintBrushHouseholdIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";

const ChangeColorControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node) return null;

  const { t } = useTranslation();
  const colorOptions = [
    { id: "default", label: t(($) => $["Default"]) },
    { id: "blue", label: t(($) => $["Blue"]) },
    { id: "green", label: t(($) => $["Green"]) },
    node.type === "organization"
      ? { id: "black", label: t(($) => $["Black"]) }
      : { id: "red", label: t(($) => $["Red"]) },
    { id: "yellow", label: t(($) => $["Yellow"]) },
  ] satisfies { id: string; label: string }[];

  const [colorSelected, setColorSelected] = useState<Selection>(
    new Set([colorOptions[0].id])
  );

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Color"])}
        icon={(iconProps) => <PaintBrushHouseholdIcon {...iconProps} />}
        menuTrigger
        id="change_color"
      />
      <Popover placement="right top" shouldFlip={false}>
        <DEMOElementToolbarListBox
          aria-labelledby="change_color"
          items={colorOptions}
          selectedKeys={colorSelected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setColorSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string") return;
              updateNodeColor(nodeId, entry);
            }
          }}
        >
          {(item) => (
            <DEMOElementToolbarListBoxItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
              isDisabled={"scope" in node.data && node.data.scope === "out"}
              icon={({ size }) => (
                <DEMOElementToolbarColorSwatch
                  color={item.id}
                  size={size}
                  nodeType={node.type}
                />
              )}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeColorControl;
