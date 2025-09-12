import { Menu, MenuItem } from "react-aria-components";
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
import { useDEMOModeler } from "$/features/modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";

const BottomMenu = () => {
  const { setViewport, zoomIn, zoomOut, fitView } = useReactFlow();
  const { setEnabled, isEnabled } = useDEMOModeler(
    useShallow((state) => ({
      setEnabled: state.setEnabled,
      isEnabled: state.isEnabled,
    }))
  );
  const { zoom } = useViewport();
  const { undo, redo } = useDEMOModeler.temporal.getState();
  return (
    <div className="sidemenu | absolute bottom-4 left-[50%] translate-x-[-50%] z-9999">
      <div className="sidemenu-inner">
        <IconContext value={{ size: 20 }} />
        <Menu className="bg-white flex gap-4">
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              setEnabled((isEnabled) => !isEnabled);
            }}
          >
            {isEnabled ? <LockSimpleIcon /> : <LockSimpleOpenIcon />}
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              fitView({ duration: 500 });
            }}
          >
            <CornersOutIcon />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              zoomOut({ duration: 500 });
            }}
          >
            <MagnifyingGlassMinusIcon />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 500 });
            }}
          >
            {Math.floor(zoom * 100) + "%"}
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              zoomIn({ duration: 500 });
            }}
          >
            <MagnifyingGlassPlusIcon />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              undo();
            }}
          >
            <ArrowCounterClockwiseIcon />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              redo();
            }}
          >
            <ArrowClockwiseIcon />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default BottomMenu;
