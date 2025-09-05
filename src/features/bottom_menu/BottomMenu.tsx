import { Menu, MenuItem } from "react-aria-components";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  ArrowsInLineHorizontalIcon,
  CornersOutIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";

const BottomMenu = () => {
  const { setViewport, zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();
  const { undo, redo } = useDEMOModeler.temporal.getState();
  return (
    <div className="sidemenu | absolute bottom-4 left-[50%] translate-x-[-50%] z-9999">
      <div className="sidemenu-inner">
        <Menu className="bg-white flex gap-4">
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              fitView({ duration: 500 });
            }}
          >
            <CornersOutIcon size={20} />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              zoomOut({ duration: 500 });
            }}
          >
            <MagnifyingGlassMinusIcon size={20} />
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
            <MagnifyingGlassPlusIcon size={20} />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              undo();
            }}
          >
            <ArrowCounterClockwiseIcon size={20} />
          </MenuItem>
          <MenuItem
            className="cursor-pointer select-none"
            onAction={() => {
              redo();
            }}
          >
            <ArrowClockwiseIcon size={20} />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default BottomMenu;
