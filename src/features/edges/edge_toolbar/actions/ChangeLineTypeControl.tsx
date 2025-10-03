import {
  getEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import {
  FlowArrowIcon,
  RectangleDashedIcon,
  RectangleIcon,
} from "@phosphor-icons/react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { CooperationModelEdge } from "../../edges.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import i18next from "$features/i18n/config";

const options = [
  { id: "solid", label: i18next.t(($) => $["Solid"]) },
  { id: "dashed", label: i18next.t(($) => $["Dashed"]) },
];

const ChangeLineTypeControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const edge = getEdge(edgeId);
  if (!edge || edge.type !== "cooperation_model_edge" || !edge.data?.lineType)
    return null;
  const [selected, setSelected] = useState<Selection>(
    new Set([edge.data?.lineType ?? "solid"])
  );

  const { t } = useTranslation();

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Change line type"])}
        icon={({ size, color }) => <FlowArrowIcon size={size} color={color} />}
        menuTrigger
        id="change_lineType"
      />
      <Popover placement="right top" shouldFlip={false}>
        <DEMOElementToolbarListBox
          aria-labelledby="change_lineType"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string") return;
              updateEdgeData<CooperationModelEdge>(edgeId, (data) => ({
                ...data,
                lineType: data?.lineType === "solid" ? "dashed" : "solid",
              }));
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
                const Icon =
                  item.id === "solid" ? RectangleIcon : RectangleDashedIcon;
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeLineTypeControl;
