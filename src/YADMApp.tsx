import { ReactFlowProvider } from "@xyflow/react";
import Topbar from "./features/topbar/Topbar";
import Sidebar from "./features/sidebar/Sidebar";

import "@xyflow/react/dist/style.css";
import "./index.css";
import DEMOModeler from "./features/modeler/DEMOModeler";

const YADMApp = () => {
  return (
    <div className="yadm-app | grid h-full [grid-template-areas:'topbar_topbar''sidebar_modeler'] grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <ReactFlowProvider>
        <Topbar />
        <Sidebar />
        <DEMOModeler />
      </ReactFlowProvider>
    </div>
  );
};
export default YADMApp;
