import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";
import DEMOModelerToolbar from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbar";
import DEMOModelerToolbarButton from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarGroup from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarSeparator from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarSeparator";
import DEMOModelerToolbarTooltip from "$/shared/components/ui/toolbars/_components/DEMOModelerToolbarTooltip";
import { TrashIcon } from "@phosphor-icons/react";
import { TooltipTrigger } from "react-aria-components";
import { useTranslation } from "react-i18next";
import {
  redoPoints,
  setPoints,
  undoPoints,
  useDrawStore,
} from "../store/useDrawStore";
import { cn } from "@sglara/cn";

const orientation = "horizontal";

const DrawToolbar = () => {
  const { t } = useTranslation();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const action = useDEMOModelerStore((state) => state.action);
  const isDrawModeActive = action === "draw";
  const points = useDrawStore((state) => state.points);
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
              label={t(($) => $["Undo board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                undoPoints(points);
              }}
              aria-label={t(($) => $["Undo board"])}
              isDisabled={!isEnabled}
            >
              <TrashIcon color="var(--color-slate-900)" />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Redo board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                redoPoints(points);
              }}
              aria-label={t(($) => $["Redo board"])}
              isDisabled={!isEnabled}
            >
              <TrashIcon color="var(--color-slate-900)" />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation={orientation}
              label={t(($) => $["Clear board"])}
            />
            <DEMOModelerToolbarButton
              onPress={() => {
                setPoints([]);
              }}
              aria-label={t(($) => $["Clear board"])}
              isDisabled={!isEnabled}
            >
              <TrashIcon color="var(--color-slate-900)" />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
      </DEMOModelerToolbar>
    </div>
  );
};

export default DrawToolbar;
