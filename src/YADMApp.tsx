import "@xyflow/react/dist/style.css";
import "./index.css";
import AppLayout from "./shared/components/layout/AppLayout";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const YADMApp = () => {
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
