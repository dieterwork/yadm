import "@xyflow/react/dist/style.css";
import "./index.css";
import AppLayout from "./shared/components/layout/AppLayout";
import { ReactFlowProvider } from "@xyflow/react";
import DiamondMarker from "./shared/components/ui/markers/DiamondMarker";

const YADMApp = () => {
  return (
    <div className="yadm-app | h-[100svh]">
      <ReactFlowProvider>
        <DiamondMarker />
        <AppLayout />
      </ReactFlowProvider>
    </div>
  );
};
export default YADMApp;
