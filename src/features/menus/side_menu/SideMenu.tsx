import { Menu, MenuItem } from "react-aria-components";
import {
  ArrowsInLineHorizontalIcon,
  CornersInIcon,
  DotsNineIcon,
  FilePlusIcon,
  IconContext,
  SelectionIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useShallow } from "zustand/react/shallow";
import { useDEMOModeler } from "$/features/modeler/useDEMOModeler";
import { usePreviewNode } from "$/features/sidebar/usePreviewNode";
import { useHelperLinesStore } from "$/features/helper_lines/useHelperLinesStore";
import { DEFAULT_CONTENT_MAP } from "$/features/nodes/utils/consts";

const SideMenu = () => {
  const { addNode, setGridVisibility, grid, setGridSnapability } =
    useDEMOModeler(
      useShallow((state) => ({
        addNode: state.addNode,
        setGridVisibility: state.setGridVisibility,
        setGridSnapability: state.setGridSnapability,
        grid: state.grid,
      }))
    );

  const { createNode } = usePreviewNode(
    useShallow((state) => ({
      createNode: state.createNode,
    }))
  );

  const { isEnabled: areHelperLinesEnabled, toggleHelperLines } =
    useHelperLinesStore(
      useShallow((state) => ({
        isEnabled: state.isEnabled,
        toggleHelperLines: state.toggle,
      }))
    );

  return (
    <div className="sidemenu | absolute top-[50%] left-4 translate-y-[-50%] z-9999">
      <div className="sidemenu-inner">
        <IconContext value={{ size: 32 }}>
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
              <FilePlusIcon />
            </MenuItem>
            <MenuItem
              onAction={() => {
                toggleHelperLines(!areHelperLinesEnabled);
              }}
              className="cursor-pointer select-none"
            >
              <ArrowsInLineHorizontalIcon
                className={cn(!areHelperLinesEnabled && "opacity-[0.5]")}
              />
            </MenuItem>
            <MenuItem
              onAction={() => {
                setGridVisibility((visible) => !visible);
              }}
              className="cursor-pointer select-none"
              aria-label={grid.isVisible ? "Hide grid" : "Show grid"}
            >
              <DotsNineIcon
                className={cn(!grid.isVisible && "opacity-[0.5]")}
              />
            </MenuItem>
            <MenuItem
              onAction={() => {
                setGridSnapability((isEnabled) => !isEnabled);
              }}
              className="cursor-pointer select-none"
              aria-label={
                grid.isSnapEnabled ? "Allow free movement" : "Snap to grid"
              }
            >
              <CornersInIcon
                className={cn(!grid.isSnapEnabled && "opacity-[0.5]")}
              />
            </MenuItem>
            <MenuItem
              onAction={() => {}}
              className="cursor-pointer select-none"
              aria-label="Select nodes"
            >
              <SelectionIcon />
            </MenuItem>
          </Menu>
        </IconContext>
      </div>
    </div>
  );
};

export default SideMenu;
