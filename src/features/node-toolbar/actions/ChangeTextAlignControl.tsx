import i18n from "$/features/i18n/config";
import { updateNodeTextAlign } from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import {
  isNodeTextAlign,
  type NodeTextAlign,
} from "$/shared/types/react.types";
import {
  TextAaIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import { useTranslation } from "react-i18next";

const textAlignOptions = [
  {
    id: "start",
    label: i18n.t(($) => $["Start"]) as string,
  },
  {
    id: "center",
    label: i18n.t(($) => $["Center"]) as string,
  },
  {
    id: "end",
    label: i18n.t(($) => $["End"]) as string,
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
  const { t } = useTranslation();
  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Align"]) as string}
        icon={({ size, color }) => <TextAaIcon size={size} color={color} />}
        menuTrigger
        id="change_textAlign"
      />
      <Popover placement="right top" shouldFlip={false}>
        <DEMOElementToolbarListBox
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
            <DEMOElementToolbarListBoxItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
              icon={(iconProps) => getIcon(item.id, iconProps)}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeTextAlignMenuItem;
