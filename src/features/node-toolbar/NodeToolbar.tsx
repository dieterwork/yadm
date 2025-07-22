import { TrashIcon } from "@phosphor-icons/react";
import {
  NodeToolbar as _NodeToolbar,
  Position,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { useDEMOModeler } from "../modeler/useDEMOModeler";

interface NodeToolbarProps {
  id: string;
  type: string;
}
const NodeToolbar = ({ id, data, type }: NodeToolbarProps) => {
  const { deleteNode, updateNodeState, updateNodeScope, updateNodeColor } =
    useDEMOModeler();
  return (
    <>
      <_NodeToolbar position={Position.Right}>
        <div className="flex flex-col">
          <Button
            className="nodrag nopan"
            onPress={() => {
              deleteNode(id);
            }}
          >
            <TrashIcon size={24} />
          </Button>
          <MenuTrigger>
            <Button className="nodrag nopan">State</Button>
            <Popover placement="right top">
              <Menu>
                <MenuItem
                  onAction={() => {
                    updateNodeState(id, "default", type);
                  }}
                >
                  Default
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeState(id, "unclear", type);
                  }}
                >
                  Unclear
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeState(id, "missing", type);
                  }}
                >
                  Missing
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
          <MenuTrigger>
            <Button className="nodrag nopan">Scope</Button>
            <Popover placement="right top">
              <Menu className="bg-white">
                <MenuItem
                  onAction={() => {
                    updateNodeScope(id, "in", type);
                  }}
                >
                  In
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeScope(id, "out", type);
                  }}
                >
                  Out
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
          <MenuTrigger>
            <Button className="nodrag nopan">Color</Button>
            <Popover placement="right top">
              <Menu className="bg-white">
                <MenuItem
                  onAction={() => {
                    updateNodeColor(id, "default");
                  }}
                >
                  Default
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeColor(id, "blue");
                  }}
                >
                  Blue
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeColor(id, "red");
                  }}
                >
                  Red
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeColor(id, "green");
                  }}
                >
                  Green
                </MenuItem>
                <MenuItem
                  onAction={() => {
                    updateNodeColor(id, "yellow");
                  }}
                >
                  Yellow
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      </_NodeToolbar>
      <div>{data?.label}</div>
    </>
  );
};

export default NodeToolbar;
