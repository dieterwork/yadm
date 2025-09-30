import {
  updateNodeScope,
  updateNodeState,
} from "$/features/modeler/useDEMOModelerStore";
import parseScope, { isNodeScope } from "$/features/nodes/utils/isNodeScope";
import type { DEMONode, NodeScope } from "$/features/nodes/nodes.types";
import ToolbarListBox from "$/shared/components/ui/toolbar/ToolbarListBox";
import ToolbarListBoxItem from "$/shared/components/ui/toolbar/ToolbarListBoxItem";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
  CopySimpleIcon,
  QuestionMarkIcon,
  RectangleDashedIcon,
  RectangleIcon,
  SelectionBackgroundIcon,
  SelectionForegroundIcon,
  SlidersIcon,
  SquareIcon,
} from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";
import { useState } from "react";
import { Popover, SubmenuTrigger, type Selection } from "react-aria-components";
import type { ActorState } from "$/features/nodes/cooperation_model/actor/actor.types";
import type { TransactionState } from "$/features/nodes/cooperation_model/transaction/transaction.types";
import type { TransactorState } from "$/features/nodes/cooperation_model/transactor/transactor.types";
import type { SelfActivationState } from "$/features/nodes/cooperation_model/self_activation/selfActivation.types";
import type { CompositeState } from "$/features/nodes/cooperation_model/composite/composite.types";
import type { ElementaryActorState } from "$/features/nodes/cooperation_model/elementary_actor/elementaryActor.types";
import type { SeveralActorsState } from "$/features/nodes/cooperation_model/several_actors/severalActors.types";

const NODES_WITH_STATE = [
  "actor",
  "composite",
  "elementary_actor",
  "self_activation",
  "transaction",
  "transactor",
  "several_actors",
] as const;

type NodeWithState = (typeof NODES_WITH_STATE)[number];

const stateOptions = {
  actor: [
    { id: "default", label: "Default" },
    { id: "unclear", label: "Unclear" },
    { id: "missing", label: "Missing" },
  ],
  composite: [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
  ],
  elementary_actor: [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
  ],
  self_activation: [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
  ],
  transaction: [
    { id: "default", label: "Default" },
    { id: "unclear", label: "Unclear" },
    { id: "missing", label: "Missing" },
    { id: "double", label: "Double" },
  ],
  transactor: [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
  ],
  several_actors: [
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
  ],
} satisfies {
  actor: {
    id: ActorState;
    label: string;
  }[];
  composite: {
    id: CompositeState;
    label: string;
  }[];
  elementary_actor: {
    id: ElementaryActorState;
    label: string;
  }[];
  self_activation: {
    id: SelfActivationState;
    label: string;
  }[];
  transaction: {
    id: TransactionState;
    label: string;
  }[];
  transactor: {
    id: TransactorState;
    label: string;
  }[];
  several_actors: {
    id: SeveralActorsState;
    label: string;
  }[];
};

const getIcon = (
  state:
    | ActorState
    | CompositeState
    | ElementaryActorState
    | SelfActivationState
    | TransactionState
    | TransactorState
    | SeveralActorsState
) => {
  switch (state) {
    case "default":
      return RectangleIcon;
    case "double":
      return CopySimpleIcon;
    case "external":
      return SelectionBackgroundIcon;
    case "internal":
      return SelectionForegroundIcon;
    case "missing":
      return RectangleDashedIcon;
    case "unclear":
      return QuestionMarkIcon;
  }
};

const ChangeStateMenuItem = ({
  nodeId,
  state,
  nodeType,
}: {
  nodeId: string;
  state:
    | ActorState
    | CompositeState
    | ElementaryActorState
    | SelfActivationState
    | TransactionState
    | TransactorState
    | SeveralActorsState;
  nodeType: DEMONode["type"];
}) => {
  if (!NODES_WITH_STATE.includes(nodeType as NodeWithState)) return null;
  const [selected, setSelected] = useState<Selection>(new Set([state]));
  const updateNodeInternals = useUpdateNodeInternals();
  const options = stateOptions[nodeType as NodeWithState];
  return (
    <SubmenuTrigger>
      <ToolbarMenuItem
        label="State"
        icon={(iconProps) => <SlidersIcon {...iconProps} />}
        submenuTrigger
        id="change_state"
      />
      <Popover
        placement="right top"
        shouldFlip={false}
        className="outline-hidden"
      >
        <ToolbarListBox
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
              updateNodeInternals(nodeId);
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
                const Icon = getIcon(item.id);
                return <Icon {...iconProps} />;
              }}
            />
          )}
        </ToolbarListBox>
      </Popover>
    </SubmenuTrigger>
  );
};

export default ChangeStateMenuItem;
