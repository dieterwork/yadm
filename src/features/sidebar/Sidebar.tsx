import SidebarMenuSectionItem from "./menu/SidebarMenuSectionItem";
import SidebarMenuButton from "./menu/SidebarMenuButton";
import { usePreviewNode } from "./usePreviewNode";
import PreviewNode from "./PreviewNode";
import {
  Collection,
  Header,
  Menu,
  MenuSection,
  MenuTrigger,
} from "react-aria-components";

const sidebarMenuItems: SidebarMenuItem[] = [
  {
    id: "cooperation_model",
    name: "cooperation_model",
    title: "Cooperation Model",
    icon: "Hii",
    sections: [
      {
        id: "actor_type",
        title: "Choose Actor Type",
        name: "actor_type",
        items: [
          {
            id: "actor",
            name: "actor",
            title: "Actor",
            icon: "actor",
            type: "actor",
          },
          {
            id: "transaction",
            name: "transaction",
            title: "Transaction",
            icon: "transaction",
            type: "transaction",
          },
          {
            id: "transactor",
            name: "transactor",
            title: "Transactor",
            icon: "transactor",
            type: "transactor",
          },
          {
            id: "self_activation",
            name: "self_activation",
            title: "Self Activation",
            icon: "self_activation",
            type: "self_activation",
          },
        ],
      },
      {
        id: "composite_transactor_role",
        name: "composite_transactor_role",
        title: "Composite Transactor Role (CTAR)",
        items: [
          {
            id: "composite",
            name: "composite",
            title: "Composite ",
            icon: "composite",
            type: "composite",
          },
          {
            id: "elementary_actor",
            name: "elementary_actor",
            title: "Elementary Actor ",
            icon: "elementary_actor",
            type: "elementary_actor",
          },
          {
            id: "several_actors",
            name: "several_actors",
            title: "Several Actors ",
            icon: "several_actors",
            type: "several_actors",
          },
        ],
      },
    ],
  },
  {
    id: "process_structure_diagram",
    name: "process_structure_diagram",
    title: "Process Structure Diagram",
    icon: "Hii",
    sections: [
      {
        id: "psd_elements",
        title: "Choose PSD Elements",
        name: "psd_elements",
        items: [
          {
            id: "transaction_time",
            name: "transaction_time",
            title: "Transaction Time",
            icon: "transaction_time",
            type: "transaction_time",
          },
          {
            id: "initiation_fact",
            name: "initiation_fact",
            title: "Initiation Fact",
            icon: "initiation_fact",
            type: "initiation_fact",
          },
          {
            id: "c_fact",
            name: "c_fact",
            title: "C-Fact",
            icon: "c_fact",
            type: "c_fact",
          },
          {
            id: "c_act",
            name: "c_act",
            title: "C-Act",
            icon: "c_act",
            type: "c_act",
          },
          {
            id: "tk_execution",
            name: "tk_execution",
            title: "TK / Execution",
            icon: "tk_execution",
            type: "tk_execution",
          },
        ],
      },
    ],
  },
  {
    id: "object_fact_diagram",
    name: "object_fact_diagram",
    title: "Object Fact Diagram",
    icon: "Hii",
    sections: [
      {
        id: "ofd_elements",
        title: "Choose OFD Elements",
        name: "ofd_elements",
        items: [
          {
            id: "production_event",
            name: "production_event",
            title: "Production Event",
            icon: "production_event",
            type: "production_event",
          },
          {
            id: "entity_class",
            name: "entity_class",
            title: "Entity Class",
            icon: "entity_class",
            type: "entity_class",
          },
          {
            id: "derived_entity",
            name: "derived_entity",
            title: "Derived Entity",
            icon: "derived_entity",
            type: "derived_entity",
          },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const previewNode = usePreviewNode((state) => state.previewNode);
  return (
    <div className="sidebar | [grid-area:sidebar] px-4 border-r border-gray-200 overflow-y-auto w-[300px]">
      <div className="sidebar-inner">
        <Collection items={sidebarMenuItems}>
          {(menuItem) => (
            <SidebarMenuButton key={menuItem.id} label={menuItem.title}>
              <Menu items={menuItem.sections}>
                {(section) => (
                  <MenuSection key={section.id} className="grid grid-cols-2">
                    <Header className="mb-4 col-span-full">
                      {section.title}
                    </Header>
                    <Collection items={section.items}>
                      {(item) => (
                        <SidebarMenuSectionItem
                          key={item.id}
                          title={item.title}
                          icon={item.icon}
                          type={item.type}
                        />
                      )}
                    </Collection>
                  </MenuSection>
                )}
              </Menu>
            </SidebarMenuButton>
          )}
        </Collection>
      </div>
      {previewNode && <PreviewNode type={previewNode.type} />}
    </div>
  );
};

export default Sidebar;
