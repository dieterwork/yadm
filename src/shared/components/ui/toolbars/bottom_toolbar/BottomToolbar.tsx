import { Tooltip, TooltipTrigger } from "react-aria-components";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CornersOutIcon,
  LockSimpleIcon,
  LockSimpleOpenIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import { useKeyPress, useReactFlow, useViewport } from "@xyflow/react";
import {
  setEnabled,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOModelerToolbar from "../_components/DEMOModelerToolbar";
import DEMOModelerToolbarGroup from "../_components/DEMOModelerToolbarGroup";
import DEMOModelerToolbarToggleButton from "../_components/DEMOModelerToolbarToggleButton";
import DEMOModelerToolbarSeparator from "../_components/DEMOModelerToolbarSeparator";
import DEMOModelerToolbarButton from "../_components/DEMOModelerToolbarButton";
import DEMOModelerToolbarTooltip from "../_components/DEMOModelerToolbarTooltip";

const BottomToolbar = () => {
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow();
  const { zoom } = useViewport();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const { undo, redo } = useDEMOModelerStore.temporal.getState();
  const orientation = "horizontal";
  const isCtrlYPressed = useKeyPress(["Control+y", "Meta+y"]);

  return (
    <div className="bottom-toolbar-wrapper | absolute bottom-4 left-[50%] translate-x-[-50%] z-9999">
      <DEMOModelerToolbar orientation={orientation} aria-label="View controls">
        <DEMOModelerToolbarGroup
          aria-label="Lock controls"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label={isEnabled ? "Lock" : "Unlock"}
              keyboardControlLabel="⌘L"
            />
            <DEMOModelerToolbarToggleButton
              aria-label={isEnabled ? "Lock modeler" : "Unlock modeler"}
              isSelected={isEnabled}
              onChange={(isEnabled) => {
                setEnabled(isEnabled);
              }}
            >
              {isEnabled ? <LockSimpleIcon /> : <LockSimpleOpenIcon />}
            </DEMOModelerToolbarToggleButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label="Fit to view controls"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Show all nodes"
            />
            <DEMOModelerToolbarButton
              aria-label="Show all nodes"
              onPress={() => {
                fitView({ duration: 500 });
              }}
            >
              <CornersOutIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label="Zoom in or out"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Zoom out"
              keyboardControlLabel="⌘-"
            />
            <DEMOModelerToolbarButton
              aria-label="Zoom out"
              onPress={() => {
                zoomOut({ duration: 500 });
              }}
            >
              <MagnifyingGlassMinusIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Zoom level"
            />
            <DEMOModelerToolbarButton
              aria-label="Zoom level"
              width="3.5rem"
              onPress={() => {
                zoomTo(1, { duration: 500 });
              }}
            >
              {Math.floor(zoom * 100) + "%"}
            </DEMOModelerToolbarButton>
          </TooltipTrigger>

          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Zoom in"
              keyboardControlLabel="⌘+"
            />
            <DEMOModelerToolbarButton
              aria-label="Zoom in"
              onPress={() => {
                zoomIn({ duration: 500 });
              }}
            >
              <MagnifyingGlassPlusIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
        <DEMOModelerToolbarSeparator orientation={orientation} />
        <DEMOModelerToolbarGroup
          aria-label="Undo and redo controls"
          aria-orientation={orientation}
        >
          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Undo"
              keyboardControlLabel="⌘Z"
            />
            <DEMOModelerToolbarButton
              aria-label="Undo"
              onPress={() => {
                undo();
              }}
            >
              <ArrowCounterClockwiseIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>

          <TooltipTrigger>
            <DEMOModelerToolbarTooltip
              orientation="horizontal"
              label="Redo"
              keyboardControlLabel="⌘Y"
            />
            <DEMOModelerToolbarButton
              aria-label="Redo"
              isActive={isCtrlYPressed}
              onPress={() => {
                redo();
              }}
            >
              <ArrowClockwiseIcon />
            </DEMOModelerToolbarButton>
          </TooltipTrigger>
        </DEMOModelerToolbarGroup>
      </DEMOModelerToolbar>
    </div>
  );
};

export default BottomToolbar;
