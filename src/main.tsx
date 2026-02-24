import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "$features/i18n/config";
import {
    initUserDataStore,
    loadPublicModels,
    loadServerFile,
    openPublicFile
} from "$features/backend/useBackendStore.ts";

loadPublicModels().finally(() => {
});
initUserDataStore();

const modelName = new URLSearchParams(window.location.search).get("model") ?? '';

if (modelName !== '' && modelName.includes('/')) {

    const piecesCount = modelName.split('/').length;

    console.log(modelName);

    if (piecesCount === 3) {

        // 3 slashes is my models
        const [mymodels, , name] = modelName.split('/');

        console.log(name);

        if (mymodels === 'mymodels') {
            loadServerFile(name).finally(() => {
            });
        }


    } else if (piecesCount === 2) {

        // 2 slashes is a public model

        const [company, name] = modelName.split('/');

        openPublicFile(name ?? '', company ?? '').finally(() => {
        });

    }

    window.history.pushState({}, "YADM", window.location.origin + '/');

}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
