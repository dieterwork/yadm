import {
  getEdge,
  updateEdgeData,
} from "$/features/modeler/useDEMOModelerStore";
import {
  ArrowElbowUpRightIcon,
  ArrowRightIcon,
  LineSegmentIcon,
} from "@phosphor-icons/react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { CooperationModelEdge } from "../../edges.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { takeSnapshot } from "$/features/actions/undo/useUndoRedoStore";

const ChangeLinePathControl = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { t } = useTranslation();
  const edge = getEdge(edgeId);
  if (!edge || !edge.data?.linePath) return null;

  const options = [
    { id: "step", label: t(($) => $["Step"]) },
    { id: "straight", label: t(($) => $["Straight"]) },
  ];

  const [selected, setSelected] = useState<Selection>(
    new Set([edge.data.linePath])
  );

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Change line path"])}
        icon={({ size, color }) => (
          <LineSegmentIcon size={size} color={color} />
        )}
        menuTrigger
        id="change_linePath"
      />
      <Popover placement="right top" shouldFlip={false}>
        <DEMOElementToolbarListBox
          aria-labelledby="change_linePath"
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
                linePath: data?.linePath === "straight" ? "step" : "straight",
              }));
              takeSnapshot();
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
                  item.id === "straight"
                    ? ArrowRightIcon
                    : ArrowElbowUpRightIcon;
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeLinePathControl;
