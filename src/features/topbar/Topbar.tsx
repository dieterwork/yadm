import { Input, TextField } from "react-aria-components";
import EditMenu from "./menus/EditMenu";
import FileMenu from "./menus/FileMenu";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { debounce } from "../../shared/utils/debounce";
import { PencilIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import uuid from "../../shared/utils/uuid";
import HelpMenu from "./menus/HelpMenu";

const Topbar = () => {
  const setFileName = useDEMOModeler((state) => state.setFileName);
  const fileName = useDEMOModeler((state) => state.fileName);

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);
  return (
    <div className="topbar | [grid-area:topbar]  border-b border-gray-200 h-14 content-center">
      <div className="topbar-inner | grid items-center grid-cols-[auto_1fr]">
        <h1>
          <a href="/">YADM</a>
        </h1>
        <nav className="nav">
          <ul className="flex justify-between items-center">
            <li>
              <ul className="flex">
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
                  aria-label="Change file name"
                  onChange={(e) => {
                    const date = (new Date()).toISOString();
                    setFileName(`${e}_` + date);
                    if (e === "") {
                      setFileName("demo-model_" + date);
                    }
                  }}
                  className="border-1 border-slate-300 rounded-sm text-md h-[2.25rem] content-center px-2"
                >
                  <Input />
                </TextField>
                <PencilIcon size={24} color="var(--color-slate-700)" />
              </div>
            </li>
            <li></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Topbar;
