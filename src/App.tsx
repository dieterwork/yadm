import "./index.css";

import DEMOModeller from "./DEMOModeller";
import { ReactFlowProvider } from "@xyflow/react";

export default function App() {
  return (
    <ReactFlowProvider>
      <DEMOModeller />
    </ReactFlowProvider>
  );
}
