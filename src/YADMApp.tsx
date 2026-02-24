import "@xyflow/react/dist/style.css";
import "./index.css";
import AppLayout from "./shared/components/layout/AppLayout";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense } from "react";

const YADMApp = () => {
  return (
    <Suspense fallback="loading">
      <div className="yadm-app | h-[100svh]">
        <ReactFlowProvider>
          <AppLayout />
        </ReactFlowProvider>
      </div>
    </Suspense>
  );
};
export default YADMApp;
