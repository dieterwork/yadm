import { updateNodeHandlesDerivation } from "$/features/modeler/store/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import { AsteriskIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import type { DEMOHandleToolbarControlProps } from "../types/DEMOHandleToolbar.types";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

const ChangeDerivationControl = ({
  handleId,
  nodeId,
  position,
}: DEMOHandleToolbarControlProps) => {
  const { t } = useTranslation();

  const options = [
    {
      id: "aggregation",
      label: t(($) => $["Aggregation"]),
      icon: AsteriskIcon,
    },
    {
      id: "generalisation",
      label: t(($) => $["Generalisation"]),
      icon: PlusIcon,
    },
    { id: "none", label: t(($) => $["None"]), icon: XIcon },
  ];

  const [selected, setSelected] = useState<Selection>(new Set([options[2].id]));

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Derivation"])}
        menuTrigger
        id="change_derivation"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_derivation"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string") return;
              updateNodeHandlesDerivation(nodeId, handleId, position, entry);
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
              icon={({ size }) => <item.icon size={size} />}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeDerivationControl;
