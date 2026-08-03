import {
  ReactFlow,
  Background,
  MiniMap,
  ConnectionMode,
  BackgroundVariant,
  SelectionMode,
  ViewportPortal,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../../edges/edges.types";
import { nodeTypes } from "../../nodes/nodes.types";

import {
  onConnect,
  onConnectStart,
  onEdgesChange,
  onEdgesDelete,
  onNodesChange,
  onNodesDelete,
  clearSelectedCardinalityLabels,
  onPaneClick,
  onReconnect,
  onReconnectEnd,
  onReconnectStart,
  setAction,
  setModel,
  updateNode,
  updateNodeEditable,
  useDEMOModelerStore,
  type DEMOModelerState,
  onBeforeDelete,
} from "../store/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import ConnectionLine from "../../connection_line/ConnectionLine";
import HelperLines from "../../helper_lines/HelperLines";
import { cn } from "@sglara/cn";
import BottomToolbar from "../../../shared/components/ui/toolbars/bottom_toolbar/BottomToolbar";
import { resetAttach } from "../../actions/attach/useAttachStore";
import { usePreviewNode } from "../../preview_node/usePreviewNode";
import { useIncompleteEdge } from "../../edges/incomplete/useIncompleteEdge";
import useKeyboardShortcuts from "../../keyboard/useKeyboardShortcuts";
import useAttachNode from "../../actions/attach/useAttachNode";
import useTitleTranslate from "$/shared/hooks/useTitleTranslate";
import Notifications from "../../notifications/Notifications";
import DiamondMarker from "$/shared/components/ui/markers/DiamondMarker";
import takeSnapshotAndSave from "../../actions/undo/takeSnapshotAndSave";
import isValidConnection from "../utils/isValidConnection";
import onSelectionChange from "../utils/onSelectionChange";
import onViewportChange from "../utils/onViewportChange";
import SideToolbar from "../../../shared/components/ui/toolbars/side_toolbar/SideToolbar";
import WhiteboardToolbar from "$/features/whiteboard/components/WhiteboardToolbar";
import uuid from "$/shared/utils/uuid";
import Whiteboard from "$/features/whiteboard/components/Whiteboard";
import takeWhiteboardSnapshotAndSave from "$/features/whiteboard/utils/takeWhiteboardSnapshotAndSave";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast/headless";
import {
  type DEMOModelJSON,
  fullEmptyModel,
} from "$/shared/types/reactFlow.types";
import type { AppError } from "$/shared/utils/AppError";
import { useQuery } from "@tanstack/react-query";
import loadServerModel from "$/features/actions/load/loadServerModel";
import loadPublicModel from "$/features/actions/load/loadPublicModel";
import useUserStore from "$/features/auth/useUserStore";
import { useTranslation } from "react-i18next";
import useSharedServerModel from "../hooks/useSharedServerModel";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import setEndOfContentEditable from "$/features/editable_content/utils/setEndOfContentEditable";
import { useQueryState } from "nuqs";

const id = uuid();

const reactFlowSelector = (state: DEMOModelerState) => ({
  isEnabled: state.isEnabled,
  nodes: state.nodes,
  edges: state.edges,
  action: state.action,
  isGridVisible: state.isGridVisible,
  isGridSnapEnabled: state.isGridSnapEnabled,
});

const init = false;

const DEMOModeler = () => {
  const { isEnabled, nodes, edges, action, isGridVisible, isGridSnapEnabled } =
    useDEMOModelerStore(useShallow(reactFlowSelector));

  const onConnectEnd = useIncompleteEdge();

  const { handleNodeAttach } = useAttachNode();

  useKeyboardShortcuts();
  usePreviewNode();
  useTitleTranslate();

  const { fitView } = useReactFlow();
  const [, setSharedModel] = useSharedServerModel();
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);
  const loadingId = useId();
  const { t } = useTranslation();
  const { user } = useUserStore();

  const [selectedPublicModel, setSelectedPublicModel] = useState<{
    fileName: string;
    company: string;
  } | null>(null);

  const [selectedServerModel, setSelectedServerModel] = useState<{
    fileName: string;
  } | null>(null);

  const publicModelQuery = useQuery({
    queryKey: [
      "public_model",
      selectedPublicModel?.company,
      selectedPublicModel?.fileName,
    ],
    queryFn: () => loadPublicModel(selectedPublicModel!),
    enabled: !!selectedPublicModel,
    staleTime: Infinity,
  });

  const serverModelQuery = useQuery<DEMOModelJSON, AppError>({
    queryKey: ["server_model", selectedServerModel?.fileName],
    queryFn: () => loadServerModel(selectedServerModel!.fileName),
    enabled: !!selectedServerModel && !!user.password,
    retry: false,
    staleTime: Infinity,
  });

  const [lastPublicLoaded, setLastPublicLoaded] = useState<{
    model: { fileName: string; company: string };
    updatedAt: number;
  } | null>(null);
  const [lastServerLoaded, setLastServerLoaded] = useState<{
    model: { fileName: string };
    updatedAt: number;
  } | null>(null);
  const [lastServerErrorAt, setLastServerErrorAt] = useState<number | null>(
    null,
  );

  if (
    selectedPublicModel &&
    publicModelQuery.isSuccess &&
    publicModelQuery.data &&
    (lastPublicLoaded?.model !== selectedPublicModel ||
      lastPublicLoaded?.updatedAt !== publicModelQuery.dataUpdatedAt)
  ) {
    setLastPublicLoaded({
      model: selectedPublicModel,
      updatedAt: publicModelQuery.dataUpdatedAt,
    });

    const data = { ...fullEmptyModel, ...publicModelQuery.data };
    setModel({ ...data, isEnabled: false });
    setSharedModel(true);
    fitView();
  }

  if (
    selectedServerModel &&
    serverModelQuery.isSuccess &&
    serverModelQuery.data &&
    (lastServerLoaded?.model !== selectedServerModel ||
      lastServerLoaded?.updatedAt !== serverModelQuery.dataUpdatedAt)
  ) {
    setLastServerLoaded({
      model: selectedServerModel,
      updatedAt: serverModelQuery.dataUpdatedAt,
    });

    setPwdModalOpen(false);
    const data = { ...fullEmptyModel, ...serverModelQuery.data };
    setModel({ ...data, isEnabled: true });
    setSharedModel(false);
    fitView();
  }

  if (
    selectedServerModel &&
    serverModelQuery.isError &&
    serverModelQuery.errorUpdatedAt !== lastServerErrorAt
  ) {
    setLastServerErrorAt(serverModelQuery.errorUpdatedAt);
    setPwdModalOpen(serverModelQuery.error?.httpCode === 401);
  }

  useEffect(() => {
    if (!selectedPublicModel) return;

    if (publicModelQuery.isFetching) {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId },
      );
    } else if (publicModelQuery.isSuccess && publicModelQuery.data) {
      toast.dismiss(loadingId);
      const data = { ...fullEmptyModel, ...publicModelQuery.data };
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        }),
      );
    } else if (publicModelQuery.isError) {
      toast.dismiss(loadingId);
      toast.error(t(($) => $["Error loading model"]));
    }
  }, [
    toast,
    selectedPublicModel,
    publicModelQuery.status,
    publicModelQuery.fetchStatus,
    publicModelQuery.dataUpdatedAt,
    publicModelQuery.errorUpdatedAt,
  ]);

  useEffect(() => {
    if (selectedServerModel) {
      if (serverModelQuery.isFetching) {
        toast.loading(
          t(($) => $["Loading model"]),
          { id: loadingId },
        );
      } else if (serverModelQuery.isSuccess && serverModelQuery.data) {
        toast.dismiss(loadingId);
        const data = { ...fullEmptyModel, ...serverModelQuery.data };
        toast.success(
          t(($) => $["Loaded model"], {
            fileName: data.fileName,
          }),
        );
      } else if (serverModelQuery.isError) {
        toast.dismiss(loadingId);
        if (serverModelQuery.error?.httpCode !== 401) {
          toast.error(t(($) => $["Error loading model. Please try again."]));
        }
      }
    }
  }, [
    toast,
    selectedServerModel,
    serverModelQuery.status,
    serverModelQuery.fetchStatus,
    serverModelQuery.dataUpdatedAt,
    serverModelQuery.errorUpdatedAt,
  ]);

  const [modelName, setModelName] = useQueryState("model");

  if (modelName) {
    if (modelName.includes("/")) {
      const piecesCount = modelName.split("/").length;

      if (piecesCount === 3) {
        // 3 slashes is my models
        const [mymodels, , fileName] = modelName.split("/");

        if (mymodels === "mymodels") {
          setSelectedServerModel({ fileName });
          if (!user.password) {
            setPwdModalOpen(true);
          }
        }
      } else if (piecesCount === 2) {
        // 2 slashes is a public model
        const [company, fileName] = modelName.split("/");

        setSelectedPublicModel({ fileName, company });
      }

      setModelName(null);
    }
  }

  return (
    <>
      <ServerPasswordModal
        isOpen={isPwdModalOpen}
        onOpenChange={(isOpen) => setPwdModalOpen(isOpen)}
        onSubmitCallback={() => {
          serverModelQuery.refetch();
        }}
        isPending={serverModelQuery.isFetching}
        errorMessage={
          serverModelQuery.error?.httpCode === 401
            ? "Invalid password"
            : undefined
        }
      />
      <div
        className="DEMO-modeler | [grid-area:modeler] h-full relative z-10"
        data-action={action}
      >
        <div className="react-flow-wrapper | h-full">
          <ReactFlow
            id={id}
            zIndexMode="manual"
            elevateNodesOnSelect={false}
            data-action={action}
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodeDragStart={(e, node) => {
              clearSelectedCardinalityLabels();
              if (node.type === "whiteboard") {
                takeWhiteboardSnapshotAndSave();
              } else {
                takeSnapshotAndSave();
              }
            }}
            onNodesChange={onNodesChange}
            deleteKeyCode={null}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onConnectStart={onConnectStart}
            onConnect={onConnect}
            onViewportChange={onViewportChange}
            onConnectEnd={onConnectEnd}
            isValidConnection={isValidConnection}
            onSelectionChange={onSelectionChange}
            onPaneClick={() => {
              resetAttach();
              onPaneClick();
            }}
            onReconnectStart={onReconnectStart}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd}
            nodesFocusable={isEnabled}
            edgesFocusable={isEnabled}
            disableKeyboardA11y={false}
            fitView
            onNodeClick={(e, node) => {
              clearSelectedCardinalityLabels();
              handleNodeAttach(node);
            }}
            onEdgeClick={() => {
              clearSelectedCardinalityLabels();
            }}
            onNodeDoubleClick={(e, node) => {
              const target = e.target;
              if (!(target instanceof HTMLElement)) return;
              if (!target.contentEditable) return;

              if (
                node.data &&
                "state" in node.data &&
                node.data.state === "missing"
              )
                return;
              updateNodeEditable(node.id, true);
              updateNode(node.id, { selected: false });
              setAction("edit");
              setTimeout(() => {
                target.focus();
                setEndOfContentEditable(target);
              }, 50);
            }}
            connectionLineComponent={(props) => <ConnectionLine {...props} />}
            connectionMode={ConnectionMode.Loose}
            snapToGrid={action !== "draw" ? isGridSnapEnabled : false}
            snapGrid={[10, 10]}
            edgesReconnectable={isEnabled}
            nodesDraggable={isEnabled}
            nodesConnectable={isEnabled}
            elementsSelectable={isEnabled}
            selectionOnDrag={action === "select"}
            selectionKeyCode={["Shift", "Meta"]}
            panOnDrag={action === "pan"}
            selectionMode={SelectionMode.Partial}
            proOptions={{ hideAttribution: true }}
            onNodeMouseEnter={(_, node) => {
              if (action === "attach") {
                updateNode(node.id, (node) => ({ ...node, selected: true }));
              }
            }}
            onNodeMouseLeave={(_, node) => {
              if (action === "attach") {
                updateNode(node.id, (node) => ({ ...node, selected: false }));
              }
            }}
          >
            <Whiteboard />
            <Background
              bgColor="var(--color-white)"
              color="var(--color-slate-500)"
              variant={BackgroundVariant.Dots}
              className={cn(isGridVisible ? "visible" : "invisible")}
            />
            <MiniMap
              pannable={true}
              nodeColor="var(--color-slate-200)"
              draggable={!isEnabled}
              aria-expanded={isEnabled}
              className={cn(
                "transition-opacity",
                isEnabled
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none",
              )}
              bgColor="var(--color-white)"
              maskColor="var(--color-slate-100)"
            />
            <SideToolbar />
            <BottomToolbar />
            <WhiteboardToolbar />
            <HelperLines />
            <Notifications />
            <ViewportPortal>
              <DiamondMarker />
            </ViewportPortal>
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default DEMOModeler;
