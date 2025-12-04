import { Collection } from "react-aria-components";
import actorIcon from "$assets/Actor.svg";
import transactionIcon from "$assets/Transaction.svg";
import transactorIcon from "$assets/Transactor.svg";
import severalActorsIcon from "$assets/Several Actors.svg";
import compositeIcon from "$assets/Composite.svg";
import selfActivationIcon from "$assets/Self-Activation.svg";
import elementaryActorIcon from "$assets/Elementary Actor.svg";
import transactionTimeIcon from "$assets/Transaction Time.svg";
import initiationFactIcon from "$assets/Initiation Fact.svg";
import cActIcon from "$assets/C-Act.svg";
import cFactIcon from "$assets/C-Fact.svg";
import tkExecutionIcon from "$assets/TK Execution.svg";
import productionEventIcon from "$assets/Production Event.svg";
import entityClassIcon from "$assets/Entity Class.svg";
import derivedEntityIcon from "$assets/Derived Entity.svg";
import SidebarSelect from "./menu/SidebarSelect";
import {
  resetPreviewNode,
  usePreviewNodeStore,
} from "$/features/preview_node/usePreviewNodeStore";
import PreviewNode from "$/features/preview_node/PreviewNode";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { useId, useState } from "react";
import SidebarToggleButton from "./SidebarToggleButton";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";

export type SidebarMenuSectionItemType = {
  id: string;
  name: string;
  label: string;
  type: DEMONode["type"];
  icon: string;
};
export type SidebarMenuSectionType = {
  id: string;
  name: string;
  label: string;
  items: SidebarMenuSectionItemType[];
};

export type SidebarMenuItemType = {
  id: string;
  name: string;
  label: string;
  icon: string;
  sections: SidebarMenuSectionType[];
};

const Sidebar = () => {
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const [isOpen, setOpen] = useState(true);
  const id = useId();

  const { t } = useTranslation();

  const sidebarMenuItems = [
    {
      id: "cooperation_model",
      name: "cooperation_model",
      label: t(($) => $["Cooperation Model"]),
      icon: "Hii",
      sections: [
        {
          id: "actor_type",
          label: t(($) => $["Choose Actor Type"]),
          name: "actor_type",
          items: [
            {
              id: "actor",
              name: "actor",
              label: t(($) => $["Actor"]),
              icon: actorIcon,
              type: "actor",
            },
            {
              id: "transaction",
              name: "transaction",
              label: t(($) => $["Transaction"]),
              icon: transactionIcon,
              type: "transaction",
            },
            {
              id: "transactor",
              name: "transactor",
              label: t(($) => $["Transactor"]),
              icon: transactorIcon,
              type: "transactor",
            },
            {
              id: "self_activation",
              name: "self_activation",
              label: t(($) => $["Self Activation"]),
              icon: selfActivationIcon,
              type: "self_activation",
            },
          ],
        },
        {
          id: "composite_transactor_role",
          name: "composite_transactor_role",
          label: t(($) => $["Composite Transactor Role (CTAR)"]),
          items: [
            {
              id: "composite",
              name: "composite",
              label: t(($) => $["Composite"]),
              icon: compositeIcon,
              type: "composite",
            },
            {
              id: "elementary_actor",
              name: "elementary_actor",
              label: t(($) => $["Elementary Actor"]),
              icon: elementaryActorIcon,
              type: "elementary_actor",
            },
            {
              id: "several_actors",
              name: "several_actors",
              label: t(($) => $["Several Actors"]),
              icon: severalActorsIcon,
              type: "several_actors",
            },
          ],
        },
      ],
    },
    {
      id: "process_structure_diagram",
      name: "process_structure_diagram",
      label: t(($) => $["Process Structure Diagram"]),
      icon: "Hii",
      sections: [
        {
          id: "psd_elements",
          label: t(($) => $["Choose PSD Elements"]),
          name: "psd_elements",
          items: [
            {
              id: "transaction_time",
              name: "transaction_time",
              label: t(($) => $["Transaction Time"]),
              icon: transactionTimeIcon,
              type: "transaction_time",
            },
            {
              id: "initiation_fact",
              name: "initiation_fact",
              label: t(($) => $["Initiation Fact"]),
              icon: initiationFactIcon,
              type: "initiation_fact",
            },
            {
              id: "c_fact",
              name: "c_fact",
              label: t(($) => $["C-Fact"]),
              icon: cFactIcon,
              type: "c_fact",
            },
            {
              id: "c_act",
              name: "c_act",
              label: t(($) => $["C-Act"]),
              icon: cActIcon,
              type: "c_act",
            },
            {
              id: "tk_execution",
              name: "tk_execution",
              label: t(($) => $["TK / Execution"]),
              icon: tkExecutionIcon,
              type: "tk_execution",
            },
          ],
        },
      ],
    },
    {
      id: "object_fact_diagram",
      name: "object_fact_diagram",
      label: t(($) => $["Object Fact Diagram"]),
      icon: "Hii",
      sections: [
        {
          id: "ofd_elements",
          label: t(($) => $["Choose OFD Elements"]),
          name: "ofd_elements",
          items: [
            {
              id: "production_event",
              name: "production_event",
              label: t(($) => $["Production Event"]),
              icon: productionEventIcon,
              type: "production_event",
            },
            {
              id: "entity_class",
              name: "entity_class",
              label: t(($) => $["Entity Class"]),
              icon: entityClassIcon,
              type: "entity_class",
            },
            {
              id: "derived_entity",
              name: "derived_entity",
              label: t(($) => $["Derived Entity"]),
              icon: derivedEntityIcon,
              type: "derived_entity",
            },
          ],
        },
      ],
    },
  ] satisfies SidebarMenuItemType[] as SidebarMenuItemType[];

  return (
    <>
      <div
        className={cn(
          "sidebar | [grid-area:sidebar] transition-all border-r border-gray-200 overflow-hidden relative h-[calc(100svh-3rem)]",
          isEnabled && isOpen ? "w-[300px]" : "w-[calc(34px)]"
        )}
        style={{ container: "sidebar / size" }}
      >
        <div
          className={cn(
            "w-[300px] px-4 h-[100cqh] transition-opacity overflow-y-auto no-scrollbar",
            isEnabled && isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex flex-col mb-6 outline-hidden">
            <Collection items={sidebarMenuItems}>
              {(item) => (
                <SidebarSelect
                  menuItem={item}
                  key={item.id}
                  isDisabled={!isOpen}
                />
              )}
            </Collection>
          </div>
        </div>
        <div className="absolute m-auto right-1 bottom-2 grid place-items-center">
          <SidebarToggleButton
            aria-controls={id}
            aria-expanded={isEnabled ? isOpen : false}
            isOpen={isEnabled ? isOpen : false}
            onOpenChange={(isOpen) => {
              if (isEnabled) {
                setOpen(isOpen);
              }
              if (previewNode) resetPreviewNode();
              if (childNodeId) resetAttach();
            }}
          />
        </div>
      </div>
      {previewNode && <PreviewNode type={previewNode?.type} />}
    </>
  );
};

export default Sidebar;
