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
  getNode,
  setPanOnDrag,
  setSelectionOnDrag,
  useDEMOModeler,
} from "$/features/modeler/useDEMOModeler";
import { usePreviewNodeStore } from "$/features/preview_node/usePreviewNodeStore";
import { useHelperLinesStore } from "$/features/helper_lines/useHelperLinesStore";
import { DEFAULT_CONTENT_MAP } from "$/features/nodes/utils/consts";
import DEMOMenu from "../_components/DEMOMenu";
import DEMOMenuItem from "../_components/DEMOMenuItem";
import DEMOMenuSection from "../_components/DEMOMenuSection";
import DEMOMenuSeparator from "../_components/DEMOMenuSeparator";

const SideMenu = () => {
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const {
    setGridVisibility,
    grid,
    setGridSnapability,
    panOnDrag,
    selectionOnDrag,
    updateNodeConnectionHandlesVisibility,
  } = useDEMOModeler(
    useShallow((state) => ({
      addNode: state.addNode,
      setGridVisibility: state.setGridVisibility,
      setGridSnapability: state.setGridSnapability,
      grid: state.grid,
      panOnDrag: state.panOnDrag,
      selectionOnDrag: state.selectionOnDrag,
      updateNodeConnectionHandlesVisibility:
        state.updateNodeConnectionHandlesVisibility,
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
        <DEMOMenu direction="vertical">
          <DEMOMenuSection aria-label="Global modeler tools">
            <DEMOMenuItem
              onAction={() => {
                setSelectionOnDrag(false);
                setPanOnDrag(true);
              }}
              aria-label="Activate hand tool"
            >
              <HandIcon
                color={
                  panOnDrag ? "var(--color-sky-500)" : "var(--color-slate-900)"
                }
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                setSelectionOnDrag(true);
                setPanOnDrag(false);
              }}
              aria-label="Activate selection tool"
            >
              <SelectionPlusIcon
                color={
                  selectionOnDrag
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                toggleHelperLines(!areHelperLinesEnabled);
              }}
            >
              <ArrowsInLineHorizontalIcon
                className={cn(!areHelperLinesEnabled && "opacity-[0.5]")}
              />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Grid options">
            <DEMOMenuItem
              onAction={() => {
                setGridSnapability((isEnabled) => !isEnabled);
              }}
              aria-label={
                grid.isSnapEnabled ? "Allow free movement" : "Snap to grid"
              }
            >
              <CornersInIcon
                className={cn(!grid.isSnapEnabled && "opacity-[0.3]")}
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                setGridVisibility((visible) => !visible);
              }}
              aria-label={grid.isVisible ? "Hide grid" : "Show grid"}
            >
              <DotsNineIcon
                className={cn(!grid.isVisible && "opacity-[0.3]")}
              />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Add nodes">
            <DEMOMenuItem
              aria-label="Add text node"
              onClick={(e) => {
                createNode({
                  type: "text",
                  width: 100,
                  height: 100,
                  position: { x: e.clientX, y: e.clientY },
                  content: DEFAULT_CONTENT_MAP["text"],
                });
              }}
              onAction={() => {
                setPanOnDrag(false);
                setSelectionOnDrag(false);
              }}
            >
              <FilePlusIcon
                color={
                  previewNode?.type === "text"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOMenuItem>
          </DEMOMenuSection>
        </DEMOMenu>
      </div>
    </div>
  );
};

export default SideMenu;
