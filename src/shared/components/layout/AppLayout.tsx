import DEMOModeler from "$/features/modeler/components/DEMOModeler";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";

let didInit = false;
const AppLayout = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const [topbarHeight, setTopbarHeight] = useState(0);

  const adjustTopbarHeight = () => {
    const el = ref.current;
    if (!el) return;
    setTopbarHeight(el.offsetHeight);
  };
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      adjustTopbarHeight();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("resize", adjustTopbarHeight);
    return () => document.removeEventListener("resize", adjustTopbarHeight);
  }, [adjustTopbarHeight]);

  return (
    <div
      style={{ "--topbar-height": topbarHeight > 0 ? topbarHeight : undefined }}
      className="app-layout | grid h-full [grid-template-areas:'topbar_topbar''sidebar_modeler'] grid-cols-[auto_1fr] grid-rows-[auto_1fr] font-app"
    >
      <Topbar ref={ref} />
      <Sidebar />
      <DEMOModeler />
    </div>
  );
};

export default AppLayout;
