import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import DEMOModelerToolbar from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbar";
import DEMOModelerToolbarButton from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarGroup from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarSeparator from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarSeparator";
import DEMOModelerToolbarTooltip from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarTooltip";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  PaintBucketIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { TooltipTrigger } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { cn } from "@sglara/cn";
import { useDrawUndoRedoStore } from "../store/useDrawUndoRedoStore";

const orientation = "horizontal";

const DrawToolbar = () => {
  const { t } = useTranslation();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const action = useDEMOModelerStore((state) => state.action);
  const isDrawModeActive = action === "draw";
  const historyAction = useDrawUndoRedoStore((state) => state.action);
  const pastHistory = useDrawUndoRedoStore((state) => state.past);
  const futureHistory = useDrawUndoRedoStore((state) => state.future);
  return (
    <div
      className={cn(
        "draw-toolbar-container | absolute top-4 left-[50%] translate-x-[-50%] z-9999 transition-opacity",
        isEnabled && isDrawModeActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <DEMOModelerToolbar
        orientation={orientation}
        aria-label={t(($) => $["Draw tool options"])}
      >
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["History options"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Color select"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {}}
              aria-label={t(($) => $["Color select"])}
              isDisabled={!isEnabled}
            >
              <PaintBucketIcon color="var(--color-slate-900)" weight="fill" />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label={t(($) => $["History options"])}
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Undo board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {}}
              aria-label={t(($) => $["Undo board"])}
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
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Redo board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {}}
              aria-label={t(($) => $["Redo board"])}
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
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Clear board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {}}
              aria-label={t(($) => $["Clear board"])}
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

export default DrawToolbar;
