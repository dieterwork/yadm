import {
  Menu,
  MenuItem,
  ToggleButton,
  TooltipTrigger,
} from "react-aria-components";
import {
  AlignLeftIcon,
  ArrowsInLineHorizontalIcon,
  CornersInIcon,
  DotIcon,
  DotsNineIcon,
  EyeIcon,
  FilePlusIcon,
  FlowArrowIcon,
  GridFourIcon,
  HandIcon,
  LineVerticalIcon,
  SelectionPlusIcon,
  ShapesIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useShallow } from "zustand/react/shallow";
import {
  setAction,
  setGridSnapEnabled,
  setGridVisible,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import {
  setPreviewNode,
  usePreviewNodeStore,
} from "$/features/preview_node/usePreviewNodeStore";
import {
  toggleHelperLines,
  useHelperLinesStore,
} from "$/features/helper_lines/useHelperLinesStore";
import { DEFAULT_CONTENT_MAP } from "$/features/nodes/utils/consts";
import DEMOModelerToolbar from "../_components/DEMOModelerToolbar";
import DEMOModelerToolbarGroup from "../_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarButton from "../_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarToggleButton from "../_components/DEMOModelerToolbarToggleButton";
import DEMOModelerToolbarSeparator from "../_components/DEMOModelerToolbarSeparator";
import type { DEMONode } from "$/features/nodes/nodes.types";
import DEMOModelerToolbarTooltip from "../_components/DEMOModelerToolbarTooltip";

const SideToolbar = () => {
  const { isGridSnapEnabled, isGridVisible, action, nodes } =
    useDEMOModelerStore(
      useShallow((state) => ({
        nodes: state.nodes,
        action: state.action,
        isGridSnapEnabled: state.isGridSnapEnabled,
        isGridVisible: state.isGridVisible,
      }))
    );
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const areHelperLinesEnabled = useHelperLinesStore((state) => state.isEnabled);

  const orientation = "vertical";

  const areHandlesVisible = nodes.some((node) => {
    if (!node.data?.handles) return false;
    if (!node.data.handles.isVisible) return false;
    return true;
  });

  return (
    <div className="side-toolbar-wrapper | absolute top-[50%] left-4 translate-y-[-50%] z-9999">
      <DEMOModelerToolbar
        orientation={orientation}
        aria-label="Modeler options"
      >
        <DEMOModelerToolbarGroup
          aria-label="Global modeler tools"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label="Activate hand tool"
            />
            <DEMOModelerToolbarToggleButton
              isSelected={action === "pan"}
              onChange={(e) => {
                setAction(e ? "pan" : null);
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
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label="Activate selection tool"
            />
            <DEMOModelerToolbarToggleButton
              isSelected={action === "select"}
              onChange={(e) => {
                setAction(e ? "select" : null);
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
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label="Enable/disable options"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                areHelperLinesEnabled
                  ? "Disable helper lines"
                  : "Enable helper lines"
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={areHelperLinesEnabled}
              onChange={(isEnabled) => {
                toggleHelperLines(isEnabled);
              }}
              aria-label={
                areHelperLinesEnabled
                  ? "Disable helper lines"
                  : "Enable helper lines"
              }
            >
              <AlignLeftIcon
                className={cn(!areHelperLinesEnabled && "opacity-30")}
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={isGridSnapEnabled ? "Snap to grid" : "Free movement"}
            />
            <DEMOModelerToolbarToggleButton
              isSelected={isGridSnapEnabled}
              onChange={(isEnabled) => {
                setGridSnapEnabled(isEnabled);
              }}
              aria-label={isGridSnapEnabled ? "Snap to grid" : "Free movement"}
            >
              {isGridSnapEnabled ? (
                <ArrowsInLineHorizontalIcon />
              ) : (
                <LineVerticalIcon />
              )}
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={isGridVisible ? "Hide grid" : "Show grid"}
            />
            <DEMOModelerToolbarToggleButton
              isSelected={isGridVisible}
              onChange={(isVisible) => {
                setGridVisible(isVisible);
              }}
              aria-label={isGridVisible ? "Hide grid" : "Show grid"}
            >
              <GridFourIcon className={cn(!isGridVisible && "opacity-30")} />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                areHandlesVisible ? "Hide node handles" : "Show node handles"
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={areHandlesVisible}
              isDisabled={nodes.length === 0}
              onChange={(isVisible) => {
                setNodes((nodes) =>
                  nodes.map((node) => {
                    if (!node.data?.handles) return node;
                    const newNode: DEMONode = {
                      ...node,
                      data: {
                        ...node.data,
                        handles: { ...node.data.handles, isVisible },
                      },
                    };
                    return newNode;
                  })
                );
              }}
              aria-label={
                areHandlesVisible ? "Hide node handles" : "Show node handles"
              }
            >
              <FlowArrowIcon
                className={cn(!areHandlesVisible && "opacity-30")}
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label="Add nodes"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label="Add text node"
            />
            <DEMOModelerToolbarButton
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
              onPress={() => {
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
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
      </DEMOModelerToolbar>
    </div>
  );
};

export default SideToolbar;
