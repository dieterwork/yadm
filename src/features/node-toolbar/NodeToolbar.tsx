import {
  CrosshairIcon,
  IconContext,
  PaintBrushIcon,
  SlidersHorizontalIcon,
  TextAaIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { NodeToolbar as _NodeToolbar, Position } from "@xyflow/react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import {
  useDEMOModeler,
  type DEMOModelerState,
} from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";

interface NodeToolbarProps {
  id: string;
  type: string;
  actions?: string[];
}

const NodeToolbar = ({ id, data, type, actions }: NodeToolbarProps) => {
  const {
    deleteNode,
    updateNodeState,
    updateNodeScope,
    updateNodeColor,
    updateNodeFontSize,
  } = useDEMOModeler(
    useShallow((state: DEMOModelerState) => ({
      deleteNode: state.deleteNode,
      updateNodeState: state.updateNodeState,
      updateNodeScope: state.updateNodeScope,
      updateNodeColor: state.updateNodeColor,
      updateNodeFontSize: state.updateNodeFontSize,
    }))
  );
  return (
    <>
      <IconContext value={{ size: 24 }}>
        <_NodeToolbar position={Position.Right}>
          <div className="flex flex-col align-center gap-1">
            {actions?.indexOf("delete") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  deleteNode(id);
                }}
                aria-label="Delete"
              >
                <TrashIcon />
              </Button>
            )}
            {actions?.indexOf("changeFontSize") !== -1 && (
              <MenuTrigger>
                <Button
                  className="nodrag nopan cursor-pointer"
                  onPress={() => {
                    deleteNode(id);
                  }}
                  aria-label="Change font size"
                >
                  <TextAaIcon />
                </Button>
                <Popover placement="right top" className="nodrag nopan">
                  <Menu>
                    {[10, 12, 14, 16, 18, 20].map((num) => (
                      <MenuItem
                        className="cursor-pointer select-none"
                        onAction={() => {
                          updateNodeFontSize(id, num);
                        }}
                      >
                        {num}
                      </MenuItem>
                    ))}
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
            {data?.state && (
              <MenuTrigger>
                <Button
                  className="nodrag nopan cursor-pointer select-none"
                  aria-label="Change state"
                >
                  <SlidersHorizontalIcon />
                </Button>
                <Popover placement="right top" className="nodrag nopan">
                  <Menu>
                    {type === "actor" || type === "transaction" ? (
                      <>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "default", type);
                          }}
                        >
                          Default
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "unclear", type);
                          }}
                        >
                          Unclear
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "missing", type);
                          }}
                        >
                          Missing
                        </MenuItem>
                        {type === "transaction" && (
                          <MenuItem
                            className="cursor-pointer select-none"
                            onAction={() => {
                              updateNodeState(id, "double", type);
                            }}
                          >
                            Double
                          </MenuItem>
                        )}
                      </>
                    ) : (
                      <>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "internal", type);
                          }}
                        >
                          Internal
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "external", type);
                          }}
                        >
                          External
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
            {data?.scope && (
              <MenuTrigger>
                <Button className="nodrag nopan cursor-pointer">
                  <CrosshairIcon />
                </Button>
                <Popover placement="right top">
                  <Menu className="bg-white">
                    <MenuItem
                      className="cursor-pointer select-none"
                      onAction={() => {
                        updateNodeScope(id, "in", type);
                      }}
                    >
                      In
                    </MenuItem>
                    <MenuItem
                      className="cursor-pointer select-none"
                      onAction={() => {
                        updateNodeScope(id, "out", type);
                      }}
                    >
                      Out
                    </MenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
            {actions.indexOf("changeColor") !== -1 && (
              <MenuTrigger>
                <Button
                  className="nodrag nopan cursor-pointer select-none"
                  aria-label="Change color"
                >
                  <PaintBrushIcon />
                </Button>
                <Popover placement="right top">
                  <Menu className="bg-white">
                    <MenuItem
                      isDisabled={data?.scope === "out"}
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      onAction={() => {
                        updateNodeColor(id, "default");
                      }}
                    >
                      Default
                    </MenuItem>
                    <MenuItem
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      isDisabled={data?.scope === "out"}
                      onAction={() => {
                        updateNodeColor(id, "blue");
                      }}
                    >
                      Blue
                    </MenuItem>
                    <MenuItem
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      isDisabled={data?.scope === "out"}
                      onAction={() => {
                        updateNodeColor(id, "red");
                      }}
                    >
                      Red
                    </MenuItem>
                    <MenuItem
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      isDisabled={data?.scope === "out"}
                      onAction={() => {
                        updateNodeColor(id, "green");
                      }}
                    >
                      Green
                    </MenuItem>
                    <MenuItem
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      isDisabled={data?.scope === "out"}
                      onAction={() => {
                        updateNodeColor(id, "yellow");
                      }}
                    >
                      Yellow
                    </MenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
          </div>
        </_NodeToolbar>
      </IconContext>
      <div>{data?.label}</div>
    </>
  );
};

export default NodeToolbar;
