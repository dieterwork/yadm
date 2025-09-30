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
  setAction,
  setGridSnapEnabled,
  setGridVisible,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import {
  setPreviewNode,
  usePreviewNodeStore,
} from "$/features/preview_node/usePreviewNodeStore";
import { useHelperLinesStore } from "$/features/helper_lines/useHelperLinesStore";
import { DEFAULT_CONTENT_MAP } from "$/features/nodes/utils/consts";
import DEMOMenu from "../_components/DEMOMenu";
import DEMOMenuItem from "../_components/DEMOMenuItem";
import DEMOMenuSection from "../_components/DEMOMenuSection";
import DEMOMenuSeparator from "../_components/DEMOMenuSeparator";
import { stat } from "fs";

const SideMenu = () => {
  const action = useDEMOModelerStore((state) => state.action);

  const { isGridSnapEnabled, isGridVisible } = useDEMOModelerStore(
    useShallow((state) => ({
      isGridSnapEnabled: state.isGridSnapEnabled,
      isGridVisible: state.isGridVisible,
    }))
  );

  const previewNode = usePreviewNodeStore((state) => state.previewNode);

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
                setAction("pan");
              }}
              aria-label="Activate hand tool"
            >
              <HandIcon
                color={
                  action === "pan"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                setAction("select");
              }}
              aria-label="Activate selection tool"
            >
              <SelectionPlusIcon
                color={
                  action === "select"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Grid options">
            <DEMOMenuItem
              onAction={() => {
                toggleHelperLines(!areHelperLinesEnabled);
              }}
            >
              <ArrowsInLineHorizontalIcon
                className={cn(!areHelperLinesEnabled && "opacity-30")}
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                setGridSnapEnabled((isEnabled) => !isEnabled);
              }}
              aria-label={
                isGridSnapEnabled ? "Allow free movement" : "Snap to grid"
              }
            >
              <CornersInIcon
                className={cn(!isGridSnapEnabled && "opacity-30")}
              />
            </DEMOMenuItem>
            <DEMOMenuItem
              onAction={() => {
                setGridVisible((visible) => !visible);
              }}
              aria-label={isGridVisible ? "Hide grid" : "Show grid"}
            >
              <DotsNineIcon className={cn(!isGridVisible && "opacity-30")} />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Add nodes">
            <DEMOMenuItem
              aria-label="Add text node"
              onClick={(e) => {
                setPreviewNode({
                  type: "text",
                  width: 100,
                  height: 100,
                  position: { x: e.clientX, y: e.clientY },
                  content: DEFAULT_CONTENT_MAP["text"],
                });
              }}
              onAction={() => {
                setAction("preview");
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
