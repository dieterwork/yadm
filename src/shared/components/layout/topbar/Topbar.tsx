import { Input, Label, TextField } from "react-aria-components";
import EditMenu from "./menus/EditMenu";
import FileMenu from "./menus/FileMenu";
import { PencilIcon } from "@phosphor-icons/react";
import HelpMenu from "./menus/HelpMenu";
import { VisuallyHidden } from "react-aria";
import { useState } from "react";
import { setFileName } from "$/features/modeler/useDEMOModelerStore";

const Topbar = () => {
  const [areMenusActive, setMenusActive] = useState(false);

  return (
    <div className="topbar | [grid-area:topbar]  border-b border-gray-200 h-12 content-center">
      <div className="topbar-inner | grid items-center grid-cols-[auto_1fr] content-center px-4">
        <h1 className="content-center">
          <a
            href="/"
            className="text-md font-semibold text-slate-900 leading-none"
          >
            YADM
          </a>
        </h1>
        <div className="nav-wrapper | ml-4">
          <nav className="nav">
            <ul className="flex justify-between items-center">
              <li>
                <ul className="flex items-center gap-1">
                  <li>
                    <FileMenu />
                  </li>
                  <li>
                    <EditMenu />
                  </li>
                  <li>
                    <HelpMenu />
                  </li>
                </ul>
              </li>
              <li>
                <div className="file-name-editor-wrapper | grid grid-cols-[1fr_auto] items-center gap-2">
                  <TextField
                    onChange={(e) => {
                      const date = new Date().toISOString();
                      setFileName(`${e}_` + date);
                      if (e === "") {
                        setFileName("demo-model_" + date);
                      }
                    }}
                    className="border-1 border-slate-200 rounded-sm text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500"
                  >
                    <VisuallyHidden>
                      <Label>Change file name</Label>
                    </VisuallyHidden>
                    <Input className="outline-hidden" />
                  </TextField>
                  <PencilIcon size={20} color="var(--color-slate-700)" />
                </div>
              </li>
              <li></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
