import { Input, Label, TextField } from "react-aria-components";
import EditMenu from "./menus/EditMenu";
import FileMenu from "./menus/FileMenu";
import HelpMenu from "./menus/HelpMenu";
import {
  setFileName,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import ChangeLanguageMenu from "./menus/ChangeLanguageMenu";

const Topbar = () => {
  const { t } = useTranslation();
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  return (
    <div className="topbar | [grid-area:topbar]  border-b border-gray-200 py-4 content-center sm:h-12 sm:p-0">
      <div className="topbar-inner | flex flex-col items-start content-center px-4 sm:grid sm:grid-cols-[auto_1fr] sm:items-center">
        <h1 className="text-md font-semibold text-slate-900 leading-none">
          {t(($) => $["YADM"])}
        </h1>
        <div className="nav-wrapper | flex flex-col mt-2 sm:flex-row sm:ml-4 sm:mt-0">
          <nav className="nav | w-full">
            <ul className="flex flex-col justify-between items-start relative gap-2 sm:flex-row sm:items-center sm:gap-0">
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
              <li className="w-fit content-center">
                {isEnabled && (
                  <TextField
                    className="grid grid-cols-[auto_1fr] items-center gap-2"
                    value={fileName}
                    onChange={(e) => {
                      if (e.length > 80) {
                        return;
                      }
                      const cleanedInput = e.replace(/[^a-zA-Z0-9_\-\s]/g, "");
                      setFileName(cleanedInput);
                    }}
                  >
                    <Label className="text-slate-900 text-xs">
                      {t(($) => $["Model name"])}
                    </Label>
                    <Input className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500" />
                  </TextField>
                )}
                {!isEnabled && (
                  <p className="text-md text-slate-900 font-medium">
                    {fileName}
                  </p>
                )}
              </li>
              <li>
                <ChangeLanguageMenu />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
