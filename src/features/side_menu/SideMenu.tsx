import { Button, Menu, MenuItem, MenuTrigger } from "react-aria-components";
import { TextAaIcon } from "@phosphor-icons/react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { DEFAULT_CONTENT_MAP } from "../nodes/utils/consts";

const SideMenu = () => {
  const { addNode } = useDEMOModeler(
    useShallow((state) => ({ addNode: state.addNode }))
  );

  const { createNode } = usePreviewNode(
    useShallow((state) => ({ createNode: state.createNode }))
  );

  const sideMenuItems = [
    {
      id: "add_text_node",
      label: "Add text",
      icon: TextAaIcon,
      action: () => {},
      onClick: (e: React.MouseEvent) => {
        //
        createNode({
          type: "text_node",
          width: 100,
          height: 100,
          position: { x: e.clientX, y: e.clientY },
          content: DEFAULT_CONTENT_MAP["text_node"],
        });
      },
    },
  ];
  return (
    <div className="sidemenu | absolute top-[50%] left-4 translate-y-[-50%]">
      <div className="sidemenu-inner">
        <Menu items={sideMenuItems}>
          {(sideMenuItem) => (
            <MenuItem
              key={sideMenuItem.id}
              onClick={sideMenuItem.onClick}
              className="cursor-pointer select-none"
            >
              {sideMenuItem.label}
            </MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;
