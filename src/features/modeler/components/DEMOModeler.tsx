import {
  ReactFlow,
  Background,
  MiniMap,
  ConnectionMode,
  BackgroundVariant,
  SelectionMode,
  ViewportPortal,
  useReactFlow,
  useUpdateNodeInternals,
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
  onReconnect,
  onReconnectEnd,
  onReconnectStart,
  setModel,
  useDEMOModelerStore,
  type DEMOModelerState,
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
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import type { AppError } from "$/shared/utils/AppError";
import { useMutation } from "@tanstack/react-query";
import loadServerModel from "$/features/actions/load/loadServerModel";
import loadPublicModel from "$/features/actions/load/loadPublicModel";
import { useTranslation } from "react-i18next";
import useSharedServerModel from "../hooks/useSharedServerModel";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";

const id = uuid();

const reactFlowSelector = (state: DEMOModelerState) => ({
  isEnabled: state.isEnabled,
  nodes: state.nodes,
  edges: state.edges,
  action: state.action,
  isGridVisible: state.isGridVisible,
  isGridSnapEnabled: state.isGridSnapEnabled,
});

let init = false;

const DEMOModeler = () => {
  const { isEnabled, nodes, edges, action, isGridVisible, isGridSnapEnabled } =
    useDEMOModelerStore(useShallow(reactFlowSelector));

  const onConnectEnd = useIncompleteEdge();

  const { handleNodeAttach } = useAttachNode();

  useKeyboardShortcuts();
  usePreviewNode();
  useTitleTranslate();

  const { fitView } = useReactFlow();
  const [currentFileName, setCurrentFileName] = useState("");
  const [, setSharedModel] = useSharedServerModel();
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);
  const loadingId = useId();
  const { t } = useTranslation();

  const publicModelMutation = useMutation({
    mutationKey: ["public_model_test"],
    mutationFn: loadPublicModel,
    onSuccess: (data) => {
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
      setModel({ ...data, isEnabled: false });
      setSharedModel(true);
      fitView();
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId }
      );
    },
    onError: () => {
      toast.dismiss(loadingId);
      toast.error(t(($) => $["Error loading model"]));
    },
  });

  const serverModelMutation = useMutation<
    DEMOModelJSON,
    AppError,
    string,
    void
  >({
    mutationKey: ["server_model"],
    mutationFn: loadServerModel,
    onSuccess: (data) => {
      if (isPwdModalOpen) {
        setPwdModalOpen(false);
      }
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
      setModel({ ...data, isEnabled: true });
      setSharedModel(false);
      fitView();
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId }
      );
    },
    onError: (error) => {
      toast.dismiss(loadingId);
      if (error.httpCode === 401) {
        setPwdModalOpen(true);
      } else {
        toast.error(t(($) => $["Error loading model. Please try again."]));
      }
    },
  });

  useEffect(() => {
    if (!init) {
      init = true;
      const modelName =
        new URLSearchParams(window.location.search).get("model") ?? "";

      if (modelName !== "" && modelName.includes("/")) {
        const piecesCount = modelName.split("/").length;

        console.log(modelName);

        if (piecesCount === 3) {
          // 3 slashes is my models
          const [mymodels, , fileName] = modelName.split("/");

          if (mymodels === "mymodels") {
            console.log("my models");
            setCurrentFileName(fileName);
            serverModelMutation.mutate(fileName);
          }
        } else if (piecesCount === 2) {
          // 2 slashes is a public model

          console.log("public model");

          const [company, fileName] = modelName.split("/");

          publicModelMutation.mutate({ fileName, company });
        }

        window.history.pushState({}, "YADM", window.location.origin + '/');

      }
    }
  }, []);

  return (
    <>
      <ServerPasswordModal
        isOpen={isPwdModalOpen}
        onOpenChange={(isOpen) => setPwdModalOpen(isOpen)}
        onSubmitCallback={() => {
          serverModelMutation.mutate(currentFileName);
        }}
        isPending={serverModelMutation.isPending}
        errorMessage={
          serverModelMutation.error?.httpCode === 401
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
            }}
            onReconnectStart={onReconnectStart}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd}
            nodesFocusable={isEnabled}
            edgesFocusable={isEnabled}
            disableKeyboardA11y={false}
            fitView
            onNodeClick={(_, node) => {
              handleNodeAttach(node);
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
                  : "opacity-0 pointer-events-none"
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
