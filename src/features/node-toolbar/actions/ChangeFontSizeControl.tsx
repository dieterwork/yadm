import { updateNodeFontSize } from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import { TextAaIcon } from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { t } from "i18next";

const fontSizeOptions = [10, 12, 14, 16, 20, 24].map((num) => ({
  id: num,
  label: num.toString(),
})) satisfies { id: number; label: string }[];

const ChangeFontSizeControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const [selected, setSelected] = useState<Selection>(
    new Set([fontSizeOptions[3].id])
  );
  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Font size"])}
        icon={({ size, color }) => <TextAaIcon size={size} color={color} />}
        menuTrigger
        id="change_fontSize"
      />
      <Popover placement="right top" shouldFlip={false}>
        <DEMOElementToolbarListBox
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
            }
          }}
        >
          {(item) => (
            <DEMOElementToolbarListBoxItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeFontSizeControl;
