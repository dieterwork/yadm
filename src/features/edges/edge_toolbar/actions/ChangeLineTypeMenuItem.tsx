import {
  getEdge,
  setEdges,
  updateEdge,
  updateEdgeData,
  updateNodeFontSize,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import {
  FlowArrow,
  FlowArrowIcon,
  RectangleDashedIcon,
  RectangleIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";
import type { CooperationModelEdge } from "../../edges.types";

const options = [
  { id: "solid", label: "Solid" },
  { id: "dashed", label: "Dashed" },
];

const ChangeLineTypeMenuItem = ({ edgeId }: { edgeId: string }) => {
  const edge = getEdge(edgeId);
  if (edge.type !== "cooperation_model_edge" || !edge.data?.lineType)
    return null;
  const [selected, setSelected] = useState<Selection>(
    new Set([edge.data?.lineType ?? "solid"])
  );
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Line type"
        icon={({ size, color }) => <FlowArrowIcon size={size} color={color} />}
        submenuTrigger
        id="change_lineType"
      />
      <Popover placement="right top" shouldFlip={false}>
        <ToolbarListBox
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
            <ToolbarListBoxItem
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
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeLineTypeMenuItem;
