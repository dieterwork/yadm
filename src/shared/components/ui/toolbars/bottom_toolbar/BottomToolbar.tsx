import { TooltipTrigger } from "react-aria-components";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CornersOutIcon,
  LockSimpleIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import { useReactFlow, useViewport } from "@xyflow/react";
import {
  saveModel,
  toggleLock,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOModelerToolbar from "../_components/DEMOModelerToolbar";
import DEMOModelerToolbarGroup from "../_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarToggleButton from "../_components/DEMOModelerToolbarToggleButton";
import DEMOModelerToolbarSeparator from "../_components/DEMOModelerToolbarSeparator";
import DEMOModelerToolbarButton from "../_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarTooltip from "../_components/DEMOModelerToolbarTooltip";
import {
  resetPreviewNode,
  usePreviewNodeStore,
} from "$/features/preview_node/usePreviewNodeStore";
import { useTranslation } from "react-i18next";
import {
  redo,
  undo,
  useUndoRedoStore,
} from "$/features/actions/undo/useUndoRedoStore";
import {
  resetAttach,
  useAttachStore,
} from "$/features/actions/attach/useAttachStore";

const BottomToolbar = () => {
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();
  const { zoom } = useViewport();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const orientation = "horizontal";
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const undoAction = useUndoRedoStore((state) => state.action);
  const pastHistory = useUndoRedoStore((state) => state.past);
  const futureHistory = useUndoRedoStore((state) => state.future);

  const { t } = useTranslation();

  const childNodeId = useAttachStore((state) => state.childNodeId);

  return (
    <div className="bottom-toolbar-wrapper | absolute bottom-4 left-[50%] translate-x-[-50%] z-9999">
      <DEMOModelerToolbar
        orientation={orientation}
        aria-label={t(($) => $["View controls"])}
      >
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Lock controls"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={isEnabled ? t(($) => $["Lock"]) : t(($) => $["Unlock"])}
              keyboardControlLabel="⌘L"
            />
            <DEMOModelerToolbarToggleButton
              aria-label={
                isEnabled
                  ? t(($) => $["Lock modeler"])
                  : t(($) => $["Unlock modeler"])
              }
              isSelected={isEnabled}
              onChange={(isEnabled) => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                toggleLock(isEnabled);
                saveModel();
                resetAttach();
              }}
            >
              <LockSimpleIcon
                color={
                  !isEnabled ? "var(--color-sky-500)" : "var(--color-slate-900)"
                }
              />
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Fit to view controls"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Show all nodes"])}
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Show all nodes"])}
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                fitView({ duration: 500 });
              }}
            >
              <CornersOutIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Zoom in or out"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Zoom out"])}
              keyboardControlLabel="⌘-"
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Zoom out"])}
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                zoomOut({ duration: 500 });
              }}
            >
              <MagnifyingGlassMinusIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Zoom level"])}
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Zoom level"])}
              width="3.5rem"
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                zoomTo(1, { duration: 500 });
              }}
            >
              {Math.floor(zoom * 100) + "%"}
            </DEMOModelerToolbarButton>
          </TooltipTrigger>

          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Zoom in"])}
              keyboardControlLabel="⌘+"
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Zoom in"])}
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                zoomIn({ duration: 500 });
              }}
            >
              <MagnifyingGlassPlusIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["Undo and redo controls"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Undo"])}
              keyboardControlLabel="⌘Z"
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Undo"])}
              isDisabled={!isEnabled || pastHistory.length === 0}
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                undo();
              }}
            >
              <ArrowCounterClockwiseIcon
                color={
                  undoAction === "undo"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
                opacity={pastHistory.length === 0 ? 0.5 : 1}
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>

          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={t(($) => $["Redo"])}
              keyboardControlLabel="⌘Y"
            />
            <DEMOModelerToolbarButton
              aria-label={t(($) => $["Redo"])}
              isDisabled={!isEnabled || futureHistory.length === 0}
              onPress={() => {
                if (previewNode) resetPreviewNode();
                if (childNodeId) resetAttach();
                redo();
              }}
            >
              <ArrowClockwiseIcon
                color={
                  undoAction === "redo"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
                opacity={futureHistory.length === 0 ? 0.5 : 1}
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
      </DEMOModelerToolbar>
    </div>
  );
};

export default BottomToolbar;
