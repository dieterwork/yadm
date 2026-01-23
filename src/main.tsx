import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "$features/i18n/config";
import {initUserDataStore, loadPublicModels, openPublicFile} from "$features/backend/useBackendStore.ts";

loadPublicModels();
initUserDataStore();

const modelName = new URLSearchParams(window.location.search).get("model") ?? '';

if (modelName !== '' && modelName.includes('/')) {

    const [company, name] = modelName.split('/');

    openPublicFile(name ?? '', company ?? '');

    window.history.pushState({}, "YADM", window.location.origin + '/');

}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
