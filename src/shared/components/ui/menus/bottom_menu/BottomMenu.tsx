import {
  Button,
  Menu,
  MenuItem,
  Separator,
  Tooltip,
  TooltipTrigger,
} from "react-aria-components";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CornersOutIcon,
  IconContext,
  LockSimpleIcon,
  LockSimpleOpenIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import { useReactFlow, useViewport } from "@xyflow/react";
import {
  setEnabled,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import BottomMenuItem from "../_components/DEMOMenuItem";
import BottomMenuSeparator from "../_components/DEMOMenuSeparator";
import DEMOMenu from "../_components/DEMOMenu";
import DEMOMenuItem from "../_components/DEMOMenuItem";
import DEMOMenuSeparator from "../_components/DEMOMenuSeparator";
import DEMOMenuSection from "../_components/DEMOMenuSection";
import DEMOMenuTooltip from "../_components/DEMOMenuTooltip";

const BottomMenu = () => {
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();
  const { zoom } = useViewport();
  const { isEnabled } = useDEMOModelerStore();

  const { undo, redo } = useDEMOModelerStore.temporal.getState();
  return (
    <div className="bottom-menu | absolute bottom-4 left-[50%] translate-x-[-50%] z-9999">
      <div className="bottom-menu-inner">
        <DEMOMenu>
          <DEMOMenuSection aria-label="Lock controls">
            <TooltipTrigger>
              <Tooltip placement="top">HEYYY</Tooltip>
              <DEMOMenuItem
                aria-label={isEnabled ? "Lock modeler" : "Unlock modeler"}
                onAction={() => {
                  setEnabled((isEnabled) => !isEnabled);
                }}
              >
                {isEnabled ? <LockSimpleIcon /> : <LockSimpleOpenIcon />}
              </DEMOMenuItem>
            </TooltipTrigger>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Fit to view controls">
            <DEMOMenuItem
              aria-label="Show all nodes"
              onAction={() => {
                fitView({ duration: 500 });
              }}
            >
              <CornersOutIcon />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Zoom in or out">
            <DEMOMenuItem
              aria-label="Zoom out"
              onAction={() => {
                zoomOut({ duration: 500 });
              }}
            >
              <MagnifyingGlassMinusIcon />
            </DEMOMenuItem>
            <DEMOMenuItem
              aria-label="Current zoom level (click to zoom to 100%)"
              autoWidth
              onAction={() => {
                zoomTo(1, { duration: 500 });
              }}
            >
              {Math.floor(zoom * 100) + "%"}
            </DEMOMenuItem>
            <DEMOMenuItem
              aria-label="Zoom in"
              onAction={() => {
                zoomIn({ duration: 500 });
              }}
            >
              <MagnifyingGlassPlusIcon />
            </DEMOMenuItem>
          </DEMOMenuSection>
          <DEMOMenuSeparator />
          <DEMOMenuSection aria-label="Undo and redo controls">
            <DEMOMenuItem
              aria-label="Undo"
              onAction={() => {
                undo();
              }}
            >
              <ArrowCounterClockwiseIcon />
            </DEMOMenuItem>
            <DEMOMenuItem
              aria-label="Redo"
              onAction={() => {
                redo();
              }}
            >
              <ArrowClockwiseIcon />
            </DEMOMenuItem>
          </DEMOMenuSection>
        </DEMOMenu>
      </div>
    </div>
  );
};

export default BottomMenu;
