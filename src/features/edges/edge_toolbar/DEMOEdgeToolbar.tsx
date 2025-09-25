import { IconContext, TextAaIcon, TrashIcon } from "@phosphor-icons/react";
import {
  NodeToolbar as _NodeToolbar,
  EdgeLabelRenderer,
  Position,
  type XYPosition,
} from "@xyflow/react";
import { Button, Menu, MenuTrigger, Popover } from "react-aria-components";
import { deleteEdge } from "../../modeler/useDEMOModeler";
import type { DEMOEdge } from "../edges.types";
import EdgeToolbar from "./EdgeToolbar";

interface DEMOEdgeToolbarProps {
  id: string;
  type: DEMOEdge["type"];
  data: DEMOEdge["data"];
  selected?: boolean;
  position?: XYPosition;
}

const DEMOEdgeToolbar = ({
  id,
  data,
  type,
  position,
}: DEMOEdgeToolbarProps) => {
  return (
    <EdgeToolbar xyPosition={position}>
      <IconContext value={{ size: 20 }}>
        <div className="nodrag nopan w-fit pointer-events-all">
          <div className="grid grid-cols-3 items-center gap-1">
            {type === "cooperation_model_edge" && (
              <MenuTrigger>
                <Button
                  className="nodrag nopan cursor-pointer"
                  onPress={() => {}}
                  aria-label="Change edge stroke type"
                >
                  <TextAaIcon />
                </Button>
                <Popover placement="right top" className="nodrag nopan">
                  <Menu className="bg-white"></Menu>
                </Popover>
              </MenuTrigger>
            )}
            <Button
              className="nodrag nopan cursor-pointer"
              onPress={() => {
                deleteEdge(id);
              }}
              aria-label="Delete edge"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </IconContext>
    </EdgeToolbar>
  );
};

export default DEMOEdgeToolbar;
