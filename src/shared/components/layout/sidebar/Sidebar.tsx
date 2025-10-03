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
import { usePreviewNodeStore } from "$/features/preview_node/usePreviewNodeStore";
import PreviewNode from "$/features/preview_node/PreviewNode";
import type { DEMONode } from "$/features/nodes/nodes.types";

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

const sidebarMenuItems = [
  {
    id: "cooperation_model",
    name: "cooperation_model",
    label: "Cooperation Model",
    icon: "Hii",
    sections: [
      {
        id: "actor_type",
        label: "Choose Actor Type",
        name: "actor_type",
        items: [
          {
            id: "actor",
            name: "actor",
            label: "Actor",
            icon: actorIcon,
            type: "actor",
          },
          {
            id: "transaction",
            name: "transaction",
            label: "Transaction",
            icon: transactionIcon,
            type: "transaction",
          },
          {
            id: "transactor",
            name: "transactor",
            label: "Transactor",
            icon: transactorIcon,
            type: "transactor",
          },
          {
            id: "self_activation",
            name: "self_activation",
            label: "Self Activation",
            icon: selfActivationIcon,
            type: "self_activation",
          },
        ],
      },
      {
        id: "composite_transactor_role",
        name: "composite_transactor_role",
        label: "Composite Transactor Role (CTAR)",
        items: [
          {
            id: "composite",
            name: "composite",
            label: "Composite",
            icon: compositeIcon,
            type: "composite",
          },
          {
            id: "elementary_actor",
            name: "elementary_actor",
            label: "Elementary Actor",
            icon: elementaryActorIcon,
            type: "elementary_actor",
          },
          {
            id: "several_actors",
            name: "several_actors",
            label: "Several Actors",
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
    label: "Process Structure Diagram",
    icon: "Hii",
    sections: [
      {
        id: "psd_elements",
        label: "Choose PSD Elements",
        name: "psd_elements",
        items: [
          {
            id: "transaction_time",
            name: "transaction_time",
            label: "Transaction Time",
            icon: transactionTimeIcon,
            type: "transaction_time",
          },
          {
            id: "initiation_fact",
            name: "initiation_fact",
            label: "Initiation Fact",
            icon: initiationFactIcon,
            type: "initiation_fact",
          },
          {
            id: "c_fact",
            name: "c_fact",
            label: "C-Fact",
            icon: cFactIcon,
            type: "c_fact",
          },
          {
            id: "c_act",
            name: "c_act",
            label: "C-Act",
            icon: cActIcon,
            type: "c_act",
          },
          {
            id: "tk_execution",
            name: "tk_execution",
            label: "TK / Execution",
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
    label: "Object Fact Diagram",
    icon: "Hii",
    sections: [
      {
        id: "ofd_elements",
        label: "Choose OFD Elements",
        name: "ofd_elements",
        items: [
          {
            id: "production_event",
            name: "production_event",
            label: "Production Event",
            icon: productionEventIcon,
            type: "production_event",
          },
          {
            id: "entity_class",
            name: "entity_class",
            label: "Entity Class",
            icon: entityClassIcon,
            type: "entity_class",
          },
          {
            id: "derived_entity",
            name: "derived_entity",
            label: "Derived Entity",
            icon: derivedEntityIcon,
            type: "derived_entity",
          },
        ],
      },
    ],
  },
] satisfies SidebarMenuItemType[] as SidebarMenuItemType[];

const Sidebar = () => {
  const previewNode = usePreviewNodeStore((state) => state.previewNode);

  return (
    <>
      <div className="sidebar | [grid-area:sidebar] px-4 border-r border-gray-200 overflow-y-auto w-[300px]">
        <div className="sidebar-inner | flex flex-col mb-6 outline-hidden">
          <Collection items={sidebarMenuItems}>
            {(item) => <SidebarSelect menuItem={item} key={item.id} />}
          </Collection>
        </div>
      </div>
      {previewNode && <PreviewNode type={previewNode?.type} />}
    </>
  );
};

export default Sidebar;
