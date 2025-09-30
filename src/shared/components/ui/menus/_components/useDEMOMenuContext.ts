import { useContext } from "react";
import DEMOMenuContext from "./DEMOMenuContext";

const useDEMOMenuContext = () => {
  const context = useContext(DEMOMenuContext);
  if (!context) throw new Error("Component is not inside DEMOMenu component");
  return context;
};

export default useDEMOMenuContext;
