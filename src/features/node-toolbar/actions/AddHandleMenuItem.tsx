import { updateNodeHandles } from "$/features/modeler/useDEMOModelerStore";
import type { DEMOHandlesData } from "$/features/nodes/nodes.types";
import ToolbarMenu from "$/shared/components/ui/toolbar/ToolbarMenu";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { assertIsPosition } from "$/shared/utils/typeAssertions";
import uuid from "$/shared/utils/uuid";
import {
  ArrowLineDownIcon,
  ArrowLineLeftIcon,
  ArrowLineRightIcon,
  ArrowLineUpIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { Position, useUpdateNodeInternals } from "@xyflow/react";
import { Popover, SubmenuTrigger } from "react-aria-components";

const handleOptions = [
  {
    id: Position.Top,
    label: "Top",
  },
  {
    id: Position.Right,
    label: "Right",
  },
  {
    id: Position.Bottom,
    label: "Bottom",
  },
  {
    id: Position.Left,
    label: "Left",
  },
] satisfies { id: Position; label: string }[];
const AddHandleMenuItem = ({
  nodeId,
  handles,
}: {
  nodeId: string;
  handles: DEMOHandlesData;
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="Add handle"
        icon={({ size, color }) => <PlusIcon size={size} color={color} />}
        submenuTrigger
        id="add_handle"
      />
      <Popover placement="right top" shouldFlip={false}>
        <ToolbarMenu
          aria-labelledby="add_handle"
          items={handleOptions}
          onAction={(key) => {
            if (typeof key !== "string") return;
            assertIsPosition(key);
            updateNodeHandles(nodeId, key, (handles) => [
              ...handles,
              { id: uuid() },
            ]);
            updateNodeInternals(nodeId);
          }}
        >
          {(item) => (
            <ToolbarMenuItem
              key={item.id}
              label={item.label}
              textValue={item.label}
              id={item.id}
              isDisabled={
                handles[item.id]?.max === handles[item.id]?.handles?.length
              }
              icon={({ size, color }) => {
                switch (item.id) {
                  case Position.Top:
                    return <ArrowLineUpIcon size={size} color={color} />;
                  case Position.Right:
                    return <ArrowLineRightIcon size={size} color={color} />;
                  case Position.Bottom:
                    return <ArrowLineDownIcon size={size} color={color} />;
                  case Position.Left:
                    return <ArrowLineLeftIcon size={size} color={color} />;
                }
              }}
            />
          )}
        </ToolbarMenu>
      </Popover>
    </SubmenuTrigger>
  );
};

export default AddHandleMenuItem;
