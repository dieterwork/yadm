import {
  getNode,
  updateNodeHandles,
} from "$/features/modeler/store/useDEMOModelerStore";
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
import { MenuTrigger, Popover } from "react-aria-components";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarMenu from "$/shared/components/ui/element_toolbar/DEMOElementToolbarMenu";
import DEMOElementToolbarMenuItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarMenuItem";
import { useTranslation } from "react-i18next";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import { DEFAULT_SIZE_MAP } from "$/features/nodes/utils/consts";

const AddHandleControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node || !("handles" in node.data) || !node.data.handles) return null;
  const handles = node.data?.handles;

  const handleOptions = [
    {
      id: Position.Top,
      label: t(($) => $["Top"]),
    },
    {
      id: Position.Right,
      label: t(($) => $["Right"]),
    },
    {
      id: Position.Bottom,
      label: t(($) => $["Bottom"]),
    },
    {
      id: Position.Left,
      label: t(($) => $["Left"]),
    },
  ] satisfies { id: Position; label: string }[];

  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["Add handle"])}
        icon={({ size, color }) => <PlusIcon size={size} color={color} />}
        menuTrigger
        id="add_handle"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarMenu
          aria-labelledby="add_handle"
          items={handleOptions}
          onAction={(key) => {
            if (typeof key !== "string") return;
            assertIsPosition(key);
            // get node's lowest offset
            const leastOffsetHandle = handles[key]?.handles?.sort((a, b) => {
              return a.offset - b.offset;
            })[0];

            console.log(leastOffsetHandle?.offset, node.type);

            updateNodeHandles(nodeId, key, (handles) => [
              ...handles,
              {
                id: uuid(),
                offset:
                  ((leastOffsetHandle?.offset ?? 0.5) -
                    ((node.type === "transaction" &&
                      node.data &&
                      "state" in node.data &&
                      node.data.state === "double") ||
                    node.type === "multiple_transaction_kind"
                      ? 6 / DEFAULT_SIZE_MAP["multiple_transaction_kind"].width
                      : 0)) *
                  (handles.length >= 1 ? 0.5 : 1),
              },
            ]);
            updateNodeInternals(nodeId);
            takeSnapshotAndSave();
          }}
        >
          {(item) => (
            <DEMOElementToolbarMenuItem
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
        </DEMOElementToolbarMenu>
      </Popover>
    </MenuTrigger>
  );
};

export default AddHandleControl;
