import { createContext } from "react";

const DEMOMenuContext = createContext<{ direction: "horizontal" | "vertical" }>(
  {
    direction: "horizontal",
  }
);

export default DEMOMenuContext;
