import DEMOModeler from "$/features/modeler/DEMOModeler";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";

const AppLayout = () => {
  return (
    <div className="app-layout | grid h-full [grid-template-areas:'topbar_topbar''sidebar_modeler'] grid-cols-[auto_1fr] grid-rows-[auto_1fr] font-app">
      <Topbar />
      <Sidebar />
      <DEMOModeler />
    </div>
  );
};

export default AppLayout;
