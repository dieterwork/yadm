import { Menu, MenuItem } from "react-aria-components";
import {
  ArrowsInLineHorizontalIcon,
  FilePlusIcon,
} from "@phosphor-icons/react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import { usePreviewNode } from "../sidebar/usePreviewNode";
import { DEFAULT_CONTENT_MAP } from "../nodes/utils/consts";
import { useHelperLinesStore } from "../helper_lines/useHelperLinesStore";
import { cn } from "@sglara/cn";

const SideMenu = () => {
  const { addNode } = useDEMOModeler(
    useShallow((state) => ({ addNode: state.addNode }))
  );

  const { createNode } = usePreviewNode(
    useShallow((state) => ({ createNode: state.createNode }))
  );

  const { isEnabled, toggleHelperLines } = useHelperLinesStore(
    useShallow((state) => ({
      isEnabled: state.isEnabled,
      toggleHelperLines: state.toggle,
    }))
  );

  return (
    <div className="sidemenu | absolute top-[50%] left-4 translate-y-[-50%] z-9999">
      <div className="sidemenu-inner">
        <Menu className="bg-white">
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
          <MenuItem
            onAction={() => {
              toggleHelperLines(!isEnabled);
            }}
            className="cursor-pointer select-none"
          >
            <ArrowsInLineHorizontalIcon
              size={32}
              className={cn(!isEnabled && "opacity-[0.5]")}
            />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;
