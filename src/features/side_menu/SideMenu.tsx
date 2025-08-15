import { Button, Menu, MenuItem, MenuTrigger } from "react-aria-components";
import { FilePlusIcon, TextAaIcon } from "@phosphor-icons/react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { DEFAULT_CONTENT_MAP, DEFAULT_SIZE_MAP } from "../nodes/utils/consts";

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
      icon: FilePlusIcon,
      action: () => {},
      onClick: (e: React.MouseEvent) => {
        createNode({
          type: "text_node",
          width: DEFAULT_SIZE_MAP["text_node"].width,
          height: DEFAULT_SIZE_MAP["text_node"].height,
          position: { x: e.clientX, y: e.clientY },
          content: DEFAULT_CONTENT_MAP["text_node"],
        });
      },
    },
  ];
  return (
    <div className="sidemenu | absolute top-[50%] left-4 translate-y-[-50%] z-9999">
      <div className="sidemenu-inner">
        <Menu items={sideMenuItems} className="bg-white">
          <MenuItem
            onClick={(e) => {
              createNode({
                type: "text_node",
                width: 100,
                height: 100,
                position: { x: e.clientX, y: e.clientY },
                content: DEFAULT_CONTENT_MAP["text_node"],
              });
            }}
            className="cursor-pointer select-none"
          >
            <FilePlusIcon size={32} />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;
