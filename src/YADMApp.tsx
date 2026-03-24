import "@xyflow/react/dist/style.css";
import "./index.css";
import AppLayout from "./shared/components/layout/AppLayout";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const YADMApp = () => {
  const modelName =
    new URLSearchParams(window.location.search).get("model") ?? "";

  if (modelName !== "" && modelName.includes("/")) {
    const piecesCount = modelName.split("/").length;

    console.log(modelName);

    if (piecesCount === 3) {
      // 3 slashes is my models
      const [mymodels, , name] = modelName.split("/");

      console.log(name);

      if (mymodels === "mymodels") {
        // loadServerFile(name).finally(() => {});
      }
    }

    window.history.pushState({}, "YADM", window.location.origin + "/");
  }

  return (
    <div className="yadm-app | h-[100svh]">
      <Suspense fallback="loading">
        <QueryClientProvider client={queryClient}>
          <ReactFlowProvider>
            <AppLayout />
          </ReactFlowProvider>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
};
export default YADMApp;
