import {
  ArrowsLeftRightIcon,
  CheckIcon,
  CrosshairIcon,
  DotOutlineIcon,
  EyeClosedIcon,
  EyeIcon,
  IconContext,
  LinkBreakIcon,
  LinkIcon,
  PaintBrushIcon,
  SlidersHorizontalIcon,
  TextAaIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  NodeToolbar as _NodeToolbar,
  Position,
  useUpdateNodeInternals,
} from "@xyflow/react";
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
import type { DEMONode } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import { useAttachNodes } from "../actions/attach/useAttachNodes";
import useDetachNodes from "../actions/attach/useDetachNodes";
import useDelete from "../keyboard/useDelete";

interface NodeToolbarProps {
  id: string;
  type: DEMONode["type"];
  data: DEMONode["data"];
  actions?: string[];
}

const positions: Position[] = [
  Position.Top,
  Position.Left,
  Position.Bottom,
  Position.Right,
];

const NodeToolbar = ({ id, data, type, actions }: NodeToolbarProps) => {
  const {
    getNode,
    deleteNode,
    updateNodeState,
    updateNodeScope,
    updateNodeColor,
    updateNodeFontSize,
    updateNodeHandles,
    updateNodeConnectionHandlesVisibility,
    updateNodeBorderVisibility,
  } = useDEMOModeler(
    useShallow((state) => ({
      getNode: state.getNode,
      deleteNode: state.deleteNode,
      updateNodeState: state.updateNodeState,
      updateNodeScope: state.updateNodeScope,
      updateNodeColor: state.updateNodeColor,
      updateNodeFontSize: state.updateNodeFontSize,
      updateNodeHandles: state.updateNodeHandles,
      updateNodeConnectionHandlesVisibility:
        state.updateNodeConnectionHandlesVisibility,
      updateNodeBorderVisibility: state.updateNodeBorderVisibility,
      addEdge: state.addEdge,
      edges: state.edges,
    }))
  );

  const node = getNode(id);

  const updateNodeInternals = useUpdateNodeInternals();

  const { deleteElement } = useDelete();

  const attachNodes = useAttachNodes();
  const detachNodes = useDetachNodes();

  return (
    <>
      <IconContext value={{ size: 24 }}>
        <_NodeToolbar position={Position.Right}>
          <div className="flex flex-col items-center gap-1">
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
                  <Menu className="bg-white">
                    {[10, 12, 14, 16, 18, 24].map((num) => (
                      <MenuItem
                        className="cursor-pointer select-none flex items-center gap-1"
                        onAction={() => {
                          updateNodeFontSize(id, num);
                        }}
                      >
                        {num}
                        {data.fontSize === num && (
                          <CheckIcon size={14} color="var(--color-blue-900)" />
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
            {actions?.indexOf("addConnectionHandle") !== -1 && (
              <MenuTrigger>
                <Button
                  className="nodrag nopan cursor-pointer"
                  aria-label="Add connection handle"
                >
                  <DotOutlineIcon />
                </Button>
                <Popover placement="right top" className="nodrag nopan">
                  <Menu className="bg-white">
                    {positions.map((pos) => (
                      <MenuItem
                        className="cursor-pointer select-none flex items-center gap-1 data-[disabled='true']:opacity-[.5]"
                        isDisabled={
                          node?.data.handles &&
                          node?.data.handles[pos].max ===
                            node?.data.handles[pos].handles.length
                        }
                        onAction={() => {
                          updateNodeHandles(id, (handles) => ({
                            ...handles,
                            [pos]: {
                              ...handles[pos],
                              handles: handles[pos]?.handles
                                ? [
                                    ...handles[pos]?.handles,
                                    { id: uuid(), type },
                                  ]
                                : [{ id: uuid(), type }],
                            },
                          }));
                        }}
                      >
                        {pos[0].toUpperCase() + pos.split(pos[0])[1]}
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
                  <Menu className="bg-white">
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
            {actions?.indexOf("changeColor") !== -1 && (
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
            {actions?.indexOf("delete") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  deleteElement(id);
                }}
                aria-label="Delete"
              >
                <TrashIcon />
              </Button>
            )}
            {actions?.indexOf("toggleConnectionHandlesVisibility") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  updateNodeConnectionHandlesVisibility(
                    id,
                    (isVisible) => !isVisible
                  );
                }}
                aria-label={
                  node?.data?.handles.isVisible
                    ? "Hide connection handles"
                    : "Show connection handles"
                }
              >
                {node?.data?.handles.isVisible ? (
                  <EyeClosedIcon />
                ) : (
                  <EyeIcon />
                )}
              </Button>
            )}
            {actions?.indexOf("attachNode") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  detachNodes([id]);
                }}
                aria-label={
                  node?.data?.handles.isVisible ? "Attach node" : "Detach node"
                }
              >
                {node?.parentId ? <LinkBreakIcon /> : <LinkIcon />}
              </Button>
            )}
            {actions?.indexOf("showBorder") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  updateNodeBorderVisibility(id, (isVisible) => !isVisible);
                }}
                aria-label={
                  node?.data?.isBorderVisible ? "Show border" : "Hide border"
                }
              >
                {node?.data?.isBorderVisible ? <EyeIcon /> : <EyeClosedIcon />}
              </Button>
            )}
          </div>
        </_NodeToolbar>
      </IconContext>
    </>
  );
};

export default NodeToolbar;
