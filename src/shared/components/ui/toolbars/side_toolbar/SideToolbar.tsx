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
  PencilRulerIcon,
  SelectionPlusIcon,
  ShapesIcon,
  SquareIcon,
} from "@phosphor-icons/react";
import { cn } from "@sglara/cn";
import { useShallow } from "zustand/react/shallow";
import {
  setAction,
  setGridSnapEnabled,
  setGridVisible,
  setHandleEditModeEnabled,
  setNodes,
  setNodesHandlesVisibility,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import {
  resetPreviewNode,
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
import DEMOModelerToolbarTooltip from "../_components/DEMOModelerToolbarTooltip";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  resetAttach,
  useAttachStore,
} from "$/features/actions/attach/useAttachStore";

const SideToolbar = () => {
  const {
    isGridSnapEnabled,
    isGridVisible,
    action,
    nodes,
    isEnabled,
    isHandleEditModeEnabled,
  } = useDEMOModelerStore(
    useShallow((state) => ({
      nodes: state.nodes,
      action: state.action,
      isGridSnapEnabled: state.isGridSnapEnabled,
      isGridVisible: state.isGridVisible,
      isEnabled: state.isEnabled,
      isHandleEditModeEnabled: state.isHandleEditModeEnabled,
    }))
  );

  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const areHelperLinesEnabled = useHelperLinesStore((state) => state.isEnabled);

  const orientation = "vertical";

  const areHandlesVisible = nodes.some((node) => {
    if (!("handles" in node.data) || !("isVisible" in node.data.handles))
      return false;
    if (!node.data.handles.isVisible) return false;
    return true;
  });

  const { t } = useTranslation();

  const childNodeId = useAttachStore((state) => state.childNodeId);

  return (
    <div
      className={cn(
        "side-toolbar-wrapper | absolute top-[50%] left-4 translate-y-[-50%] z-9999 transition-opacity",
        isEnabled
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <DEMOModelerToolbar
        orientation={orientation}
        aria-label={t(($) => $["Modeler options"])}
      >
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Global modeler tools"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={t(($) => $["Activate hand tool"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setAction("pan");
              }}
              aria-label={t(($) => $["Activate hand tool"])}
            >
              <HandIcon
                color={
                  action === "pan"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={t(($) => $["Activate selection tool"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setAction("select");
              }}
              aria-label={t(($) => $["Activate selection tool"])}
              isDisabled={!isEnabled}
            >
              <SelectionPlusIcon
                color={
                  action === "select"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Enable/disable options"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                areHelperLinesEnabled
                  ? t(($) => $["Disable helper lines"])
                  : t(($) => $["Enable helper lines"])
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={areHelperLinesEnabled}
              onChange={(isEnabled) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                toggleHelperLines(isEnabled);
              }}
              aria-label={
                areHelperLinesEnabled
                  ? t(($) => $["Disable helper lines"])
                  : t(($) => $["Enable helper lines"])
              }
              isDisabled={!isEnabled}
            >
              <AlignLeftIcon
                className={cn(!areHelperLinesEnabled && "opacity-30")}
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                isGridSnapEnabled
                  ? t(($) => $["Snap to grid"])
                  : t(($) => $["Free movement"])
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={isGridSnapEnabled}
              onChange={(isEnabled) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setGridSnapEnabled(isEnabled);
              }}
              aria-label={
                isGridSnapEnabled
                  ? t(($) => $["Snap to grid"])
                  : t(($) => $["Free movement"])
              }
              isDisabled={!isEnabled}
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
              label={
                isGridVisible
                  ? t(($) => $["Hide grid"])
                  : t(($) => $["Show grid"])
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={isGridVisible}
              onChange={(isVisible) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setGridVisible(isVisible);
              }}
              aria-label={
                isGridVisible
                  ? t(($) => $["Hide grid"])
                  : t(($) => $["Show grid"])
              }
              isDisabled={!isEnabled}
            >
              <GridFourIcon className={cn(!isGridVisible && "opacity-30")} />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                areHandlesVisible
                  ? t(($) => $["Hide node handles"])
                  : t(($) => $["Show node handles"])
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={areHandlesVisible}
              isDisabled={nodes.length === 0 || !isEnabled}
              onChange={(isVisible) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setNodesHandlesVisibility(isVisible);

                if (!isVisible && isHandleEditModeEnabled) {
                  setHandleEditModeEnabled(false);
                }
              }}
              aria-label={
                areHandlesVisible
                  ? t(($) => $["Hide node handles"])
                  : t(($) => $["Show node handles"])
              }
            >
              <FlowArrowIcon
                className={cn(!areHandlesVisible && "opacity-30")}
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={
                isHandleEditModeEnabled
                  ? t(($) => $["Disable handle edit mode"])
                  : t(($) => $["Enable handle edit mode"])
              }
            />
            <DEMOModelerToolbarToggleButton
              isSelected={isHandleEditModeEnabled}
              isDisabled={nodes.length === 0 || !isEnabled}
              onChange={(isEnabled) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                setHandleEditModeEnabled(isEnabled);

                if (isEnabled && !areHandlesVisible) {
                  setNodesHandlesVisibility(true);
                }
              }}
              aria-label={
                isHandleEditModeEnabled
                  ? t(($) => $["Disable handle edit mode"])
                  : t(($) => $["Enable handle edit mode"])
              }
            >
              <PencilRulerIcon
                className={cn(!isHandleEditModeEnabled && "opacity-30")}
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Add nodes"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={t(($) => $["Add text node"])}
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Add text node"])}
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
              isDisabled={!isEnabled}
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
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="vertical"
              label={t(($) => $["Add organization node"])}
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Add organization node"])}
              onClick={(e) => {
                setPreviewNode({
                  type: "organization",
                  width: 100,
                  height: 100,
                  position: { x: e.clientX, y: e.clientY },
                });
              }}
              onPress={() => {
                setAction("preview");
              }}
              isDisabled={!isEnabled}
            >
              <SquareIcon
                color={
                  previewNode?.type === "organization"
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
