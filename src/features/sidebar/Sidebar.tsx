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
    id: "cooperation-model",
    name: "cooperation-model",
    title: "Cooperation Model",
    icon: "Hii",
    sections: [
      {
        id: "actor-type",
        title: "Choose Actor Type",
        name: "actor-type",
        items: [
          {
            id: "actor",
            name: "actor",
            title: "Actor",
            icon: "Hii",
            type: "actor",
          },
          {
            id: "transaction",
            name: "transaction",
            title: "Transaction",
            icon: "Hii",
            type: "transaction",
          },
          {
            id: "transactor",
            name: "transactor",
            title: "Transactor",
            icon: "Hii",
            type: "transactor",
          },
          {
            id: "self-activation",
            name: "self-activation",
            title: "Self Activation",
            icon: "Hii",
            type: "self-activation",
          },
        ],
      },
      {
        id: "composite-transactor-role",
        name: "composite-transactor-role",
        title: "Composite Transactor Role (CTAR)",
        items: [
          {
            id: "composite-ctar",
            name: "composite-ctar",
            title: "Composite CTAR",
            icon: "Hii",
            type: "composite-ctar",
          },
          {
            id: "elementary-actor",
            name: "elementary-actor",
            title: "Elementary Actor CTAR",
            icon: "Hii",
            type: "elementary-actor",
          },
          {
            id: "several-actors",
            name: "several-actors",
            title: "Several Actors CTAR",
            icon: "Hii",
            type: "several-actors",
          },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const { previewNode } = usePreviewNode();
  return (
    <div className="sidebar | [grid-area:sidebar] px-4 border-r border-gray-200 overflow-y-auto">
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
