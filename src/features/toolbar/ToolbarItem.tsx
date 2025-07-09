import { CaretDownIcon } from "@phosphor-icons/react";
import type React from "react";
import { useToolbar } from "./ToolbarStore";

import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { DEMOObjectComponents } from "../DEMO_objects/DEMOObject";
import type { DEMOObjectType } from "../DEMO_objects/types";

interface ToolbarItemProps {
  children?: React.ReactNode;
}

const ToolbarItem = ({ children }: ToolbarItemProps) => {
  const { setSelectedNodeType } = useToolbar();

  return (
    <div className="pallette-item | flex items-center gap-1 z-1000">
      <button className="aspect-square w-10 bg-blue-500">{children}</button>
      <div className="grid place-items-center h-full">
        <MenuTrigger>
          <Button
            className="h-full px-1 rounded-sm hover:bg-gray-100 data-active:bg-gray-200"
            aria-label="More items"
          >
            <CaretDownIcon size={10} />
          </Button>
          <Popover className={"bg-white"}>
            <Menu>
              {Object.keys(DEMOObjectComponents).map((type) => (
                <MenuItem
                  className="select-none"
                  onAction={() => setSelectedNodeType(type as DEMOObjectType)}
                  key={type}
                >
                  Actor
                </MenuItem>
              ))}
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    </div>
  );
};

export default ToolbarItem;
