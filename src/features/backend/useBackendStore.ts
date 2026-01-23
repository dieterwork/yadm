import {create} from "zustand";
import type {DEMOModelJSON} from "$shared/types/reactFlow.types.ts";
import {
    saveModel,
    setEdges,
    setEnabled,
    setFileName,
    setNodes,
    useDEMOModelerStore
} from "$features/modeler/useDEMOModelerStore.ts";

export const useAskServerPwdDataStore = create<{ showPwdModal: boolean, callback: () => {} }>(
    (set, get) => (
        {
            showPwdModal: false, callback: () => {
            }
        }
    )
);


const baseUrl = "https://yadm.app";
const baseUrlApi = baseUrl + "/api";

export const usePublicModelsDataStore = create<{
    files: { modelName: string, fileName: string, companyName: string }[]
}>(
    (set, get) => (
        {
            files: []
        }
    )
);

const backendData = (set, get) => (
    {
        email: '',
        code: '',
        serverFiles: [],
    }
);

export const useUserDataStore = create<{
    email: string,
    code: string,
    serverFiles: { fileName: string, schemaVersion: string, lastEditor: string, modifiedTimestamp: string }[]
}>(backendData);

export const initUserDataStore = () => {
    const email = localStorage.getItem('yadm-user-email') || '';

    const authKey = localStorage.getItem('yadm-auth-key') || '';

    useUserDataStore.setState({email, code: '', serverFiles: []});

    if (authKey !== '') {
        loadServerFiles().finally(() => console.log('loaded files'));
    }

}

export const logOut = () => {
    localStorage.removeItem('yadm-user-email');
    localStorage.removeItem('yadm-auth-key');
    localStorage.removeItem('yadm-pwd');
    localStorage.removeItem('demo-model');
    location.reload();
};

export const sendCodeToEmail = async () => {

    try {
        const res = await fetch(`${baseUrlApi}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: useUserDataStore.getState().email
            })
        });
        const data = await res.json();
        return data.ok;
    } catch (err) {
        console.log(err);
        return false;
    }

};

export const verifyCode = async () => {

    try {
        let res = await fetch(`${baseUrlApi}/codeCheck`, {
            method: "POST",
            body: JSON.stringify({
                email: useUserDataStore.getState().email,
                code: useUserDataStore.getState().code,
            })
        });
        let data: any = await res.json();
        if (!data.ok) {
            return false;
        }
        useUserDataStore.setState({email: data.email});

        localStorage.setItem('yadm-user-email', data.email);
        localStorage.setItem('yadm-auth-key', data.authKey);

        await loadServerFiles();

        return true;
    } catch (err) {
        console.log(err)
        return false;
    }

};

export const loadServerFiles = async () => {

    const email = useUserDataStore.getState().email;
    const authKey = localStorage.getItem('yadm-auth-key') || '';

    try {
        let res = await fetch(`${baseUrlApi}/files`, {
            method: "GET",
            headers: {
                "Authorization": 'Digest ' + authKey,
                "X-Email": email
            }
        });

        if (res.status === 401) {
            logOut();
            return;
        }

        useUserDataStore.setState({serverFiles: await res.json()});

        return;

    } catch (err) {
        console.error(err);
    }

}

export const loadServerFile = async (fileName: string) => {

    const authKey = localStorage.getItem('yadm-auth-key') || '';
    const pwd = localStorage.getItem('yadm-pwd') || '';
    const email = useUserDataStore.getState().email;

    if (pwd === '') {
        // Ask for pwd
        useAskServerPwdDataStore.setState({showPwdModal: true, callback: () => loadServerFile(fileName)});
        return;
    } else {
        localStorage.setItem('yadm-pwd', pwd);
    }

    try {
        const res = await fetch(`${baseUrlApi}/files/${fileName}/data`, {
            method: "GET",
            headers: {
                "Authorization": 'Digest ' + authKey,
                "X-Email": email,
                "X-Pwd": pwd
            }
        });

        if (res.status === 401) {
            logOut();
            return;
        }

        const data = await res.text();

        const localDEMOModel: DEMOModelJSON = JSON.parse(data);

        setNodes(localDEMOModel.nodes);
        setEdges(localDEMOModel.edges);
        setEnabled(localDEMOModel.isEnabled);
        setFileName(localDEMOModel.fileName);

        setTimeout(() => {
            saveModel();
        }, 500);

        return

    } catch (err) {
        console.error(err);
    }
}

export const saveServerFile = async () => {

    const DEMOInstance = useDEMOModelerStore.getState().DEMOInstance;
    const isEnabled = useDEMOModelerStore.getState().isEnabled;
    const fileName = useDEMOModelerStore.getState().fileName;

    if (!DEMOInstance) return;

    const jsonModel = JSON.stringify({
        ...DEMOInstance.toObject(),
        isEnabled,
        version: "1.0.0",
        fileName,
    } satisfies DEMOModelJSON);

    const email = useUserDataStore.getState().email;

    const authKey = localStorage.getItem('yadm-auth-key') || '';
    const pwd = localStorage.getItem('yadm-pwd') || '';

    if (pwd === '') {
        // Ask for pwd
        useAskServerPwdDataStore.setState({showPwdModal: true, callback: () => saveServerFile()});
        return;
    } else {
        localStorage.setItem('yadm-pwd', pwd);
    }

    try {
        const res = await fetch(`${baseUrlApi}/files/${fileName}/data`, {
            method: "PUT",
            headers: {
                "Authorization": 'Digest ' + authKey,
                "X-Email": email,
                "X-Pwd": pwd
            },
            body: jsonModel
        });

        if (res.status === 401) {
            logOut();
            return;
        }

        saveModel();

        await loadServerFiles();

    } catch (err) {
        console.error(err);
    }

}

export const loadPublicModels = async () => {

    try {
        const res = await fetch(`${baseUrlApi}/public-files`, {
            method: "GET"
        });

        const files = await res.json() as { modelName: string, fileName: string, companyName: string }[];

        const filteredFiles = files.filter(file => file.companyName !== 'shared');

        usePublicModelsDataStore.setState({files: filteredFiles});

        return;

    } catch (err) {
        console.error(err);
    }

}

export const openPublicFile = async (fileName: string, companyName: string) => {

    if (fileName === '' || companyName === '') {
        return;
    }

    try {
        const res = await fetch(`${baseUrl}/models/${companyName}/${fileName}.json`, {
            method: "GET"
        });

        const data = await res.text();

        const localDEMOModel: DEMOModelJSON = JSON.parse(data);
        setNodes(localDEMOModel.nodes);
        setEdges(localDEMOModel.edges);
        setEnabled(localDEMOModel.isEnabled);
        setFileName(localDEMOModel.fileName);

        setTimeout(() => {
            saveModel();
            document.getElementById('fit-view-button')?.click();
        }, 500);

        return

    } catch (err) {
        console.error(err);
    }
}