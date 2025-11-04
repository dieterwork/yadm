import {
  getNode,
  updateNode,
  updateNodeState,
} from "$/features/modeler/useDEMOModelerStore";
import {
  CopySimpleIcon,
  QuestionMarkIcon,
  RectangleDashedIcon,
  RectangleIcon,
  SelectionBackgroundIcon,
  SelectionForegroundIcon,
  SlidersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { MenuTrigger, Popover, type Selection } from "react-aria-components";
import type { ActorState } from "$/features/nodes/cooperation_model/actor/actor.types";
import type { TransactionState } from "$/features/nodes/cooperation_model/transaction/transaction.types";
import type { TransactorState } from "$/features/nodes/cooperation_model/transactor/transactor.types";
import type { SelfActivationState } from "$/features/nodes/cooperation_model/self_activation/selfActivation.types";
import type { CompositeState } from "$/features/nodes/cooperation_model/composite/composite.types";
import type { ElementaryActorState } from "$/features/nodes/cooperation_model/elementary_actor/elementaryActor.types";
import type { SeveralActorsState } from "$/features/nodes/cooperation_model/several_actors/severalActors.types";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import DEMOElementToolbarListBox from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBox";
import DEMOElementToolbarListBoxItem from "$/shared/components/ui/element_toolbar/DEMOElementToolbarListBoxItem";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import { calculateDoubleDiamondInCircleDimensions } from "$/features/shapes/utils/calculateDoubleDiamondInCircleDimensions";
import type { OrganizationState } from "$/features/nodes/nodes.types";

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

const ChangeStateControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const node = getNode(nodeId);
  if (!node) return null;
  if (!("state" in node.data)) return null;

  const { t } = useTranslation();
  const defaultT = t(($) => $["Default"]);
  const unclearT = t(($) => $["Unclear"]);
  const missingT = t(($) => $["Missing"]);
  const doubleT = t(($) => $["Double"]);

  const internalT = t(($) => $["Internal"]);
  const externalT = t(($) => $["External"]);

  const stateOptions = {
    actor: [
      { id: "default", label: defaultT as string },
      { id: "unclear", label: unclearT as string },
      { id: "missing", label: missingT as string },
    ],
    composite: [
      { id: "internal", label: internalT as string },
      { id: "external", label: externalT as string },
    ],
    elementary_actor: [
      { id: "internal", label: internalT as string },
      { id: "external", label: externalT as string },
    ],
    self_activation: [
      { id: "internal", label: internalT as string },
      { id: "external", label: externalT as string },
    ],
    transaction: [
      { id: "default", label: defaultT as string },
      { id: "unclear", label: unclearT as string },
      { id: "missing", label: missingT as string },
      { id: "double", label: doubleT as string },
    ],
    transactor: [
      { id: "internal", label: internalT as string },
      { id: "external", label: externalT as string },
    ],
    several_actors: [
      { id: "internal", label: internalT as string },
      { id: "external", label: externalT as string },
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
    organization: {
      id: OrganizationState;
      label: string;
    }[];
  };

  const [selected, setSelected] = useState<Selection>(
    new Set([node.data.state])
  );
  const options = stateOptions[node.type as NodeWithState];
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
                    width: node.style.height ?? node.measured.height ?? 0,
                  },
                }));
              }
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
