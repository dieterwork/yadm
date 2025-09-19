import { Menu, MenuItem } from "react-aria-components";
import {
  ArrowsInLineHorizontalIcon,
  CornersInIcon,
  DotsNineIcon,
  FilePlusIcon,
  HandIcon,
  IconContext,
  SelectionIcon,
  SelectionPlusIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useShallow } from "zustand/react/shallow";
import {
  setPanOnDrag,
  setSelectionOnDrag,
  useDEMOModeler,
} from "$/features/modeler/useDEMOModeler";
import { usePreviewNodeStore } from "$/features/preview_node/usePreviewNodeStore";
import { useHelperLinesStore } from "$/features/helper_lines/useHelperLinesStore";
import { DEFAULT_CONTENT_MAP } from "$/features/nodes/utils/consts";

const SideMenu = () => {
  const {
    setGridVisibility,
    grid,
    setGridSnapability,
    panOnDrag,
    selectionOnDrag,
  } = useDEMOModeler(
    useShallow((state) => ({
      addNode: state.addNode,
      setGridVisibility: state.setGridVisibility,
      setGridSnapability: state.setGridSnapability,
      grid: state.grid,
      panOnDrag: state.panOnDrag,
      selectionOnDrag: state.selectionOnDrag,
    }))
  );

  const { createNode } = usePreviewNodeStore(
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
              onAction={() => {
                setSelectionOnDrag(false);
                setPanOnDrag(true);
              }}
              className="cursor-pointer select-none"
              aria-label="Activate hand tool"
            >
              <HandIcon
                color={
                  panOnDrag ? "var(--color-blue-500)" : "var(--color-slate-900)"
                }
              />
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                createNode({
                  type: "text",
                  width: 100,
                  height: 100,
                  position: { x: e.clientX, y: e.clientY },
                  content: DEFAULT_CONTENT_MAP["text"],
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
              onAction={() => {
                setSelectionOnDrag(true);
                setPanOnDrag(false);
              }}
              className="cursor-pointer select-none"
              aria-label="Activate selection tool"
            >
              <SelectionPlusIcon
                color={
                  selectionOnDrag
                    ? "var(--color-blue-500)"
                    : "var(--color-slate-900)"
                }
              />
            </MenuItem>
          </Menu>
        </IconContext>
      </div>
    </div>
  );
};

export default SideMenu;
