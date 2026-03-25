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
import LoginMenu from "$shared/components/layout/topbar/menus/LoginMenu.tsx";
import LoggedInMenu from "$shared/components/layout/topbar/menus/LoggedInMenu.tsx";
import PublicModelsMenu from "$shared/components/layout/topbar/menus/PublicModelsMenu.tsx";
import toast, { useToasterStore } from "react-hot-toast/headless";
import useUserStore from "$/features/auth/useUserStore";
import ServerModelsMenu from "$/shared/components/layout/topbar/menus/ServerModelsMenu";

const Topbar = () => {
  const { t } = useTranslation();
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const { toasts } = useToasterStore();
  const { isAuthenticated } = useUserStore();

  return (
    <div className="topbar | [grid-area:topbar] relative border-b border-gray-200 py-4 content-center md:h-12 md:p-0">
      <div className="topbar-inner | flex flex-col items-start content-center px-4 md:grid md:grid-cols-[auto_1fr] md:items-center">
        <h1 className="text-md font-semibold text-slate-900 leading-none">
          {t(($) => $["YADM"])}
        </h1>
        <div className="nav-wrapper | flex flex-col mt-2 md:flex-row md:ml-4 md:mt-0">
          <nav className="nav | w-full">
            <ul className="flex flex-col justify-between items-start gap-2 md:flex-row md:items-center md:gap-0">
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
                  <li>
                    <PublicModelsMenu />
                  </li>
                  {isAuthenticated && (
                    <li>
                      <ServerModelsMenu />
                    </li>
                  )}
                </ul>
              </li>
              <li className="w-fit content-center md:absolute md:inset-0 md:m-auto">
                {isEnabled && (
                  <TextField
                    className="grid grid-cols-[auto_1fr] items-center gap-2"
                    value={fileName}
                    onChange={(e) => {
                      const cleanedInput = e
                        .trimStart()
                        .replace(/[^a-zA-Z0-9_\-\s]/g, "");

                      if (cleanedInput.length > 40) {
                        return;
                      }

                      setFileName(cleanedInput);
                    }}
                    onBlur={(e) => {
                      if (toasts.find((toast) => toast.id === "emptyFilename"))
                        return;
                      if (e.currentTarget.value === "") {
                        toast.error("Please enter a valid model name", {
                          id: "emptyFilename",
                          position: "top-center",
                        });
                      }
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
              <ul className="flex items-center gap-1">
                <li>{isAuthenticated ? <LoggedInMenu /> : <LoginMenu />}</li>
                <li>
                  <ChangeLanguageMenu />
                </li>
              </ul>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
