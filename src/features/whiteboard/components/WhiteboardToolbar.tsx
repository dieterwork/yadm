import {
  setAction,
  setNodes,
  setWhiteboardVisible,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import DEMOModelerToolbar from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbar";
import DEMOModelerToolbarButton from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarGroup from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarSeparator from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarSeparator";
import DEMOModelerToolbarTooltip from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarTooltip";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  EyeClosedIcon,
  EyeIcon,
  PaintBrushIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { cn } from "@sglara/cn";
import {
  redoWhiteboard,
  undoWhiteboard,
  useWhiteboardUndoRedoStore,
} from "../store/useWhiteboardUndoRedoStore";
import useWhiteboardStore, { setColor } from "../store/useWhiteboardStore";
import { TooltipTrigger } from "react-aria-components";
import DEMOToolbarColorPicker from "$/shared/components/ui/color_picker/DEMOToolbarColorPicker";
import { useEffect, useState } from "react";

const orientation = "horizontal";

const WhiteboardToolbar = () => {
  const { t } = useTranslation();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const action = useDEMOModelerStore((state) => state.action);
  const isDrawModeActive = action === "draw";
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const isWhiteboardVisible = nodes
    .filter((node) => node.type === "whiteboard")
    .every((node) => !node.hidden);
  const isWhiteboardEnabled = useDEMOModelerStore(
    (state) => state.isWhiteboardEnabled
  );
  const historyAction = useWhiteboardUndoRedoStore((state) => state.action);
  const pastHistory = useWhiteboardUndoRedoStore((state) => state.past);
  const futureHistory = useWhiteboardUndoRedoStore((state) => state.future);

  const optionsLabel = t(($) => $["Whiteboard options"]);
  const displayOptionsLabel = t(($) => $["Display options"]);
  const showLabel = t(($) => $["Show whiteboard"]);
  const hideLabel = t(($) => $["Hide whiteboard"]);
  const whiteBoardVisibilityLabel = isWhiteboardVisible ? showLabel : hideLabel;
  const colorSelectLabel = t(($) => $["Select color"]);
  const undoLabel = t(($) => $["Undo"]);
  const redoLabel = t(($) => $["Redo"]);
  const clearLabel = t(($) => $["Clear whiteboard"]);
  const drawLabel = t(($) => $["Draw"]);

  const whiteboardNodes = nodes.filter((node) => node.type === "whiteboard");

  const color = useWhiteboardStore((state) => state.color);

  const [initialColor] = useState(() => color);

  useEffect(() => {
    console.log(pastHistory, futureHistory);
  }, [pastHistory, futureHistory]);
  return (
    <div
      className={cn(
        "draw-toolbar-container | absolute top-4 left-[50%] translate-x-[-50%] z-9999 transition-opacity",
        isEnabled && isWhiteboardEnabled
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <DEMOModelerToolbar orientation={orientation} aria-label={optionsLabel}>
        <DEMOModelerToolbarGroup
          aria-label={displayOptionsLabel}
          aria-orientation={orientation}
        >
          {/* Activate draw */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={drawLabel}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                setAction("draw");
                setNodes((nodes) =>
                  nodes.map((node) => ({ ...node, selected: false }))
                );
              }}
              aria-label={drawLabel}
              isDisabled={!isEnabled}
            >
              <PaintBrushIcon
                color={
                  isDrawModeActive
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          {/* Change whiteboard node color */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={colorSelectLabel}
            />
            <DEMOToolbarColorPicker
              label={colorSelectLabel}
              defaultValue={initialColor}
              onChange={(val) => setColor(val.toString("hex"))}
              value={color}
            />
          </TooltipTrigger>
          {/* Change whiteboard visibility */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={whiteBoardVisibilityLabel}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                setWhiteboardVisible((isVisible) => !isVisible);
              }}
              aria-label={whiteBoardVisibilityLabel}
              isDisabled={!isEnabled}
            >
              {isWhiteboardVisible ? (
                <EyeIcon color="var(--color-slate-900)" />
              ) : (
                <EyeClosedIcon color="var(--color-slate-900)" />
              )}
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["History options"])}
          aria-orientation={orientation}
        >
          {/* Undo */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={undoLabel}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                undoWhiteboard(whiteboardNodes);
              }}
              aria-label={undoLabel}
              isDisabled={!isEnabled}
            >
              <ArrowCounterClockwiseIcon
                color={
                  historyAction === "undo"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
                opacity={pastHistory.length === 0 ? 0.5 : 1}
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          {/* Redo */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={redoLabel}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                redoWhiteboard(whiteboardNodes);
              }}
              aria-label={redoLabel}
              isDisabled={!isEnabled}
            >
              <ArrowClockwiseIcon
                color={
                  historyAction === "redo"
                    ? "var(--color-sky-500)"
                    : "var(--color-slate-900)"
                }
                opacity={futureHistory.length === 0 ? 0.5 : 1}
              />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          {/* Clear */}
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={clearLabel}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                setNodes(nodes.filter((node) => node.type !== "whiteboard"));
              }}
              aria-label={clearLabel}
              isDisabled={!isEnabled}
            >
              <TrashIcon color="var(--color-slate-900)" />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
      </DEMOModelerToolbar>
    </div>
  );
};

export default WhiteboardToolbar;
