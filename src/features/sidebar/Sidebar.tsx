import SidebarMenuSectionItem from "./menu/SidebarMenuSectionItem";
import SidebarMenuButton from "./menu/SidebarMenuButton";
import { Menu, MenuHeading, MenuItems, MenuSection } from "@headlessui/react";
import { usePreviewNode } from "./usePreviewNode";
import PreviewNode from "./PreviewNode";

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
        {sidebarMenuItems.map((menuItem) => (
          <Menu key={menuItem.id}>
            <SidebarMenuButton label={menuItem.title} />
            <MenuItems
              portal={false}
              modal={false}
              className="w-(--button-width)"
            >
              {menuItem.sections.map((section) => (
                <MenuSection key={section.id}>
                  <MenuHeading className="mb-4">{section.title}</MenuHeading>
                  <div className="grid grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <SidebarMenuSectionItem
                        key={item.id}
                        title={item.title}
                        type={item.type}
                      />
                    ))}
                  </div>
                </MenuSection>
              ))}
            </MenuItems>
          </Menu>
        ))}
      </div>
      {previewNode && <PreviewNode type={previewNode.type} />}
    </div>
  );
};

export default Sidebar;
