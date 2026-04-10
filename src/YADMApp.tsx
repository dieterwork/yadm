import "@xyflow/react/dist/style.css";
import "./index.css";
import AppLayout from "./shared/components/layout/AppLayout";
import { ReactFlowProvider, useReactFlow } from "@xyflow/react";
import { Suspense, useEffect, useId, useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import toast from "react-hot-toast/headless";
import { useTranslation } from "react-i18next";
import loadPublicModel from "./features/actions/load/loadPublicModel";
import useSharedServerModel from "./features/modeler/hooks/useSharedServerModel";
import { setModel } from "./features/modeler/store/useDEMOModelerStore";
import type { DEMOModelJSON } from "./shared/types/reactFlow.types";
import type { AppError } from "./shared/utils/AppError";
import loadServerModel from "./features/actions/load/loadServerModel";
import ServerPasswordModal from "./shared/components/ui/modal/ServerPasswordModal";

const queryClient = new QueryClient();

const YADMApp = () => {
  const { fitView } = useReactFlow();
  const [isSharedModel, setSharedModel] = useSharedServerModel();
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
      setModel(data);
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
          serverModelMutation.mutate(fileName);
          setSharedModel(true);
        }
      } else if (piecesCount === 2) {
        // 2 slashes is a public model

        console.log("public model");

        const [company, fileName] = modelName.split("/");

        publicModelMutation.mutate({ fileName, company });
        setSharedModel(true);
      } else {
        setSharedModel(false);
      }
    } else {
      setSharedModel(false);
    }
  }, []);

  return (
    <div className="yadm-app | h-[100svh]">
      <Suspense fallback="loading">
        <QueryClientProvider client={queryClient}>
          <ReactFlowProvider>
            <AppLayout />
          </ReactFlowProvider>
        </QueryClientProvider>
      </Suspense>
      <ServerPasswordModal
        isOpen={isPwdModalOpen}
        onOpenChange={(isOpen) => setPwdModalOpen(isOpen)}
        isPending={serverModelMutation.isPending}
        errorMessage={
          serverModelMutation.error?.httpCode === 401
            ? "Invalid password"
            : undefined
        }
      />
    </div>
  );
};
export default YADMApp;
