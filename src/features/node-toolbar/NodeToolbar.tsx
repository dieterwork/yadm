import {
  AlignLeftIcon,
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
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import {
  NodeToolbar as _NodeToolbar,
  Position,
  useUpdateNodeInternals,
} from "@xyflow/react";
import {
  Button,
  Collection,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import {
  deleteNode,
  updateNodeConnectionHandlesVisibility,
  useDEMOModeler,
  type DEMOModelerState,
} from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import type { DEMONode } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import { useAttachNodes } from "../actions/attach/useAttachNodes";
import useDetachNodes from "../actions/attach/useDetachNodes";
import useDelete from "../keyboard/useDelete";
import { useAttachStore } from "../actions/attach/useAttachStore";

interface NodeToolbarProps {
  id: string;
  type: DEMONode["type"];
  data: DEMONode["data"];
  actions?: string[];
}

const positions: { id: Position; value: Position; label: string }[] = [
  { id: Position.Top, value: Position.Top, label: "Top" },
  { id: Position.Right, value: Position.Right, label: "Right" },
  { id: Position.Bottom, value: Position.Bottom, label: "Bottom" },
  { id: Position.Left, value: Position.Left, label: "Left" },
];

const fontSizes: { id: string; value: number; label: string }[] = [
  10, 12, 14, 16, 18, 24,
].map((num) => ({ id: num.toString(), value: num, label: num.toString() }));

const NodeToolbar = ({ id, data, type, actions }: NodeToolbarProps) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const {
    getNode,
    updateNodeState,
    updateNodeScope,
    updateNodeColor,
    updateNodeFontSize,
    updateNodeHandles,
    updateNodeBorderVisibility,
    getChildNodes,
    updateNodeTextAlign,
  } = useDEMOModeler(
    useShallow((state) => ({
      getNode: state.getNode,
      updateNodeState: state.updateNodeState,
      updateNodeScope: state.updateNodeScope,
      updateNodeColor: state.updateNodeColor,
      updateNodeFontSize: state.updateNodeFontSize,
      updateNodeHandles: state.updateNodeHandles,
      updateNodeBorderVisibility: state.updateNodeBorderVisibility,
      addEdge: state.addEdge,
      edges: state.edges,
      getChildNodes: state.getChildNodes,
      updateNode: state.updateNode,
      updateNodeTextAlign: state.updateNodeTextAlign,
    }))
  );

  const node = getNode(id);

  const { deleteElement } = useDelete();

  const detachNodes = useDetachNodes();

  const { setChildNodeIdAttach, setAttaching } = useAttachStore(
    useShallow((state) => ({
      setChildNodeIdAttach: state.setChildNodeId,
      setAttaching: state.setAttaching,
    }))
  );

  return (
    <>
      <IconContext value={{ size: 24 }}>
        <_NodeToolbar position={Position.Right}>
          <div className="grid grid-cols-3 items-center gap-1">
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
                    <Collection items={fontSizes}>
                      {(fontSize) => (
                        <MenuItem
                          className="cursor-pointer select-none flex items-center gap-1"
                          onAction={() => {
                            updateNodeFontSize(id, fontSize.value);
                          }}
                        >
                          {fontSize.label}
                          {data.fontSize === fontSize.value && (
                            <CheckIcon size={14} color="var(--color-sky-900)" />
                          )}
                        </MenuItem>
                      )}
                    </Collection>
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
                    <Collection items={positions}>
                      {(position) => (
                        <MenuItem
                          className="cursor-pointer select-none flex items-center gap-1 data-[disabled='true']:opacity-[.5]"
                          isDisabled={
                            node?.data.handles &&
                            node?.data.handles[position.value].max ===
                              node?.data.handles[position.value].handles.length
                          }
                          onAction={() => {
                            updateNodeHandles(id, (handles) => ({
                              ...handles,
                              [position.value]: {
                                ...handles[position.value],
                                handles: handles[position.value]?.handles
                                  ? [
                                      ...handles[position.value]?.handles,
                                      { id: uuid(), type },
                                    ]
                                  : [{ id: uuid(), type }],
                              },
                            }));
                            updateNodeInternals(id);
                          }}
                        >
                          {position.label}
                        </MenuItem>
                      )}
                    </Collection>
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
                            updateNodeInternals(id);
                          }}
                        >
                          Default
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "unclear", type);
                            updateNodeInternals(id);
                          }}
                        >
                          Unclear
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "missing", type);
                            updateNodeInternals(id);
                          }}
                        >
                          Missing
                        </MenuItem>
                        {type === "transaction" && (
                          <MenuItem
                            className="cursor-pointer select-none"
                            onAction={() => {
                              updateNodeState(id, "double", type);
                              updateNodeInternals(id);
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
                            updateNodeInternals(id);
                          }}
                        >
                          Internal
                        </MenuItem>
                        <MenuItem
                          className="cursor-pointer select-none"
                          onAction={() => {
                            updateNodeState(id, "external", type);
                            updateNodeInternals(id);
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
                        updateNodeInternals(id);
                      }}
                    >
                      In
                    </MenuItem>
                    <MenuItem
                      className="cursor-pointer select-none"
                      onAction={() => {
                        updateNodeScope(id, "out", type);
                        updateNodeInternals(id);
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
                        updateNodeInternals(id);
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
                        updateNodeColor(id, "sky");
                        updateNodeInternals(id);
                      }}
                    >
                      sky
                    </MenuItem>
                    <MenuItem
                      className={
                        "data-disabled:opacity-[0.5] cursor-pointer select-none"
                      }
                      isDisabled={data?.scope === "out"}
                      onAction={() => {
                        updateNodeColor(id, "red");
                        updateNodeInternals(id);
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
                        updateNodeInternals(id);
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
                        updateNodeInternals(id);
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
                  updateNodeInternals(id);
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
                  const childNodeIds = getChildNodes(id).map((node) => node.id);
                  if (childNodeIds.length === 0) {
                    setChildNodeIdAttach(id);
                    setAttaching(true);
                  } else {
                    detachNodes(childNodeIds, id);
                  }
                }}
                aria-label={node?.parentId ? "Detach node" : "Attach node"}
              >
                {node?.parentId ? <LinkBreakIcon /> : <LinkIcon />}
              </Button>
            )}
            {actions?.indexOf("showBorder") !== -1 && (
              <Button
                className="nodrag nopan cursor-pointer"
                onPress={() => {
                  updateNodeBorderVisibility(id, (isVisible) => !isVisible);
                  updateNodeInternals(id);
                }}
                aria-label={
                  node?.data?.isBorderVisible ? "Show border" : "Hide border"
                }
              >
                {node?.data?.isBorderVisible ? <EyeIcon /> : <EyeClosedIcon />}
              </Button>
            )}
            {actions?.indexOf("changeTextAlign") !== -1 && (
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
                      onAction={() => {
                        updateNodeTextAlign(id, "left");
                        updateNodeInternals(id);
                      }}
                    >
                      <TextAlignLeftIcon />
                    </MenuItem>
                    <MenuItem
                      onAction={() => {
                        updateNodeTextAlign(id, "center");
                        updateNodeInternals(id);
                      }}
                    >
                      <TextAlignCenterIcon />
                    </MenuItem>
                    <MenuItem
                      onAction={() => {
                        updateNodeTextAlign(id, "right");
                        updateNodeInternals(id);
                      }}
                    >
                      <TextAlignRightIcon />
                    </MenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            )}
          </div>
        </_NodeToolbar>
      </IconContext>
    </>
  );
};

export default NodeToolbar;
