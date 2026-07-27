import {
  getNode,
  updateNode,
  updateNodeState,
} from "$/features/modeler/store/useDEMOModelerStore";
import {
  CopySimpleIcon,
  QuestionMarkIcon,
  RectangleDashedIcon,
  RectangleIcon,
  SlidersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { ActorState } from "$/features/nodes/cooperation_structure_diagram/actor/actor.types";
import type { TransactionState } from "$/features/nodes/cooperation_structure_diagram/transaction/transaction.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import { calculateDoubleDiamondInCircleDimensions } from "$/features/shapes/utils/calculateDoubleDiamondInCircleDimensions";
import type {
  MultipleTransactionKindState,
  OrganizationState,
} from "$/features/nodes/nodes.types";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NODES_WITH_STATE = [
  "actor",
  "transaction",
  "multiple_transaction_kind",
] as const;

export type NodeWithState = (typeof NODES_WITH_STATE)[number];

const getIcon = (
  state: ActorState | TransactionState | MultipleTransactionKindState,
) => {
  switch (state) {
    case "default":
      return RectangleIcon;
    case "double":
      return CopySimpleIcon;
    case "missing":
      return RectangleDashedIcon;
    case "unclear":
      return QuestionMarkIcon;
  }
};

const ChangeStateControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node) return null;

  const defaultT = t(($) => $["Default"]);
  const unclearT = t(($) => $["Unclear"]);
  const missingT = t(($) => $["Missing"]);
  const doubleT = t(($) => $["Double"]);

  const stateOptions = {
    actor: [
      { id: "default", label: defaultT as string },
      { id: "unclear", label: unclearT as string },
      { id: "missing", label: missingT as string },
    ],

    transaction: [
      { id: "default", label: defaultT as string },
      { id: "unclear", label: unclearT as string },
      { id: "missing", label: missingT as string },
      { id: "double", label: doubleT as string },
    ],
    multiple_transaction_kind: [
      { id: "default", label: defaultT as string },
      { id: "unclear", label: unclearT as string },
      { id: "missing", label: missingT as string },
    ],
    organization: [
      { id: "default", label: defaultT as string },
      { id: "missing", label: missingT as string },
    ],
  } satisfies {
    actor: {
      id: ActorState;
      label: string;
    }[];
    transaction: {
      id: TransactionState;
      label: string;
    }[];
    multiple_transaction_kind: {
      id: MultipleTransactionKindState;
      label: string;
    }[];
    organization: {
      id: OrganizationState;
      label: string;
    }[];
  };

  const options = stateOptions[node.type as NodeWithState];

  const [selected, setSelected] = useState<Selection>(
    new Set([
      "state" in node.data && node.data.state ? node.data.state : options[0].id,
    ]),
  );
  return (
    <MenuTrigger>
      <DEMOElementToolbarButton
        label={t(($) => $["State"]) as string}
        icon={(iconProps) => <SlidersIcon {...iconProps} />}
        menuTrigger
        id="change_state"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <DEMOElementToolbarListBox
          aria-labelledby="change_state"
          items={options}
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelected(selection);
            if (!(selection instanceof Set)) return;
            for (const entry of selection) {
              if (typeof entry !== "string") return;
              updateNodeState(nodeId, entry);
              // only transaction nodes can have double state
              if (node.type !== "transaction") return;
              if (entry === "double") {
                if (!node.measured?.height) return;
                const newNodeWidth =
                  calculateDoubleDiamondInCircleDimensions(node.measured.height)
                    .width + 4;
                updateNode(nodeId, (node) => ({
                  ...node,
                  style: {
                    ...node.style,
                    width: newNodeWidth,
                  },
                }));
              } else {
                updateNode(nodeId, (node) => ({
                  ...node,
                  style: {
                    ...node.style,
                    width: node.style?.height ?? node.measured?.height ?? 0,
                  },
                }));
              }
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
                const Icon = getIcon(item.id);
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </DEMOElementToolbarListBox>
      </Popover>
    </MenuTrigger>
  );
};

export default ChangeStateControl;
