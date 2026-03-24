import { create } from "zustand";
import type { DEMOModelJSON } from "$shared/types/reactFlow.types.ts";
import {
  saveModel,
  setEdges,
  setEnabled,
  setFileName,
  setNodes,
} from "$features/modeler/useDEMOModelerStore.ts";

const baseUrl = "https://yadm.app";
const baseUrlApi = baseUrl + "/api";

const backendData = (set, get) => ({
  email: "",
  code: "",
  serverFiles: [],
});

type ServerFiles = {
  fileName: string;
  schemaVersion: string;
  lastEditor: string;
  modifiedTimestamp: string;
}[];

// export const initUserDataStore = () => {
//   const email = localStorage.getItem("yadm-user-email") || "";
//   const authKey = localStorage.getItem("yadm-auth-key") || "";

//   useUserDataStore.setState({ email, code: "", serverFiles: [] });
//   if (authKey !== "") {
//     loadServerFiles().finally(() => console.log("loaded files"));
//   }
// };

export const logOut = () => {
  localStorage.removeItem("yadm-user-email");
  localStorage.removeItem("yadm-auth-key");
  localStorage.removeItem("yadm-pwd");
  localStorage.removeItem("demo-model");
  location.reload();
};

export const verifyCode = async () => {
  try {
    let res = await fetch(`${baseUrlApi}/codeCheck`, {
      method: "POST",
      body: JSON.stringify({
        email: useUserDataStore.getState().email,
        code: useUserDataStore.getState().code,
      }),
    });
    let data: any = await res.json();
    if (!data.ok) {
      return false;
    }
    useUserDataStore.setState({ email: data.email });

    localStorage.setItem("yadm-user-email", data.email);
    localStorage.setItem("yadm-auth-key", data.authKey);

    await loadServerFiles();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const loadServerFiles = async () => {
  const email = useUserDataStore.getState().email;
  const authKey = localStorage.getItem("yadm-auth-key") || "";

  try {
    const res = await fetch(`${baseUrlApi}/files`, {
      method: "GET",
      headers: {
        Authorization: "Digest " + authKey,
        "X-Email": email,
      },
    });

    if (res.status === 401) {
      logOut();
      return;
    }
    //github.com/fgossiaux/yadm-admin-fe

    https: useUserDataStore.setState({ serverFiles: await res.json() });

    return;
  } catch (err) {
    console.error(err);
  }
};

export const loadServerFile = async (fileName: string) => {
  const authKey = localStorage.getItem("yadm-auth-key") || "";
  const pwd = localStorage.getItem("yadm-pwd") || "";
  const email = useUserDataStore.getState().email;

  if (pwd === "") {
    // Ask for pwd
    useAskServerPwdDataStore.setState({
      showPwdModal: true,
      callback: () => loadServerFile(fileName),
    });
    return;
  } else {
    localStorage.setItem("yadm-pwd", pwd);
  }

  try {
    const res = await fetch(`${baseUrlApi}/files/${fileName}/data`, {
      method: "GET",
      headers: {
        Authorization: "Digest " + authKey,
        "X-Email": email,
        "X-Pwd": pwd,
      },
    });

    if (res.status === 401) {
      // Wipe password and try again
      localStorage.removeItem("yadm-pwd");
      useAskServerPwdDataStore.setState({
        showBadPasswordMessage: true,
        showPwdModal: true,
      });
      await loadServerFile(fileName);
      return;
    } else {
      useAskServerPwdDataStore.setState({ showBadPasswordMessage: false });
    }

    const data = await res.text();

    const localDEMOModel: DEMOModelJSON = JSON.parse(data);

    setNodes(localDEMOModel.nodes);
    setEdges(localDEMOModel.edges);
    setEnabled(localDEMOModel.isEnabled);
    setFileName(localDEMOModel.fileName);

    setTimeout(() => {
      saveModel();
      document.getElementById("fit-view-button")?.click();
    }, 500);

    return;
  } catch (err) {
    console.error(err);
  }
};

// export const saveServerFile = async () => {
//   const DEMOInstance = useDEMOModelerStore.getState().DEMOInstance;
//   const isEnabled = useDEMOModelerStore.getState().isEnabled;
//   const fileName = useDEMOModelerStore.getState().fileName;

//   if (!DEMOInstance) return;

//   const jsonModel = JSON.stringify({
//     ...DEMOInstance.toObject(),
//     isEnabled,
//     version: "1.0.0",
//     fileName,
//   } satisfies DEMOModelJSON);

//   const email = useUserDataStore.getState().email;

//   const authKey = localStorage.getItem("yadm-auth-key") || "";
//   const pwd = localStorage.getItem("yadm-pwd") || "";

//   if (pwd === "") {
//     // Ask for pwd
//     useAskServerPwdDataStore.setState({
//       showPwdModal: true,
//       callback: () => saveServerFile(),
//     });
//     return;
//   } else {
//     localStorage.setItem("yadm-pwd", pwd);
//   }

//   try {
//     const res = await fetch(`${baseUrlApi}/files/${fileName}/data`, {
//       method: "PUT",
//       headers: {
//         Authorization: "Digest " + authKey,
//         "X-Email": email,
//         "X-Pwd": pwd,
//       },
//       body: jsonModel,
//     });

//     if (res.status === 401) {
//       // Wipe password and try again
//       localStorage.removeItem("yadm-pwd");
//       useAskServerPwdDataStore.setState({
//         showBadPasswordMessage: true,
//         showPwdModal: true,
//       });
//       await saveServerFile();
//       return;
//     } else {
//       useAskServerPwdDataStore.setState({ showBadPasswordMessage: false });
//     }

//     saveModel();

//     await loadServerFiles();
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const loadPublicModels = async () => {
//   try {
//     const res = await fetch(`${baseUrlApi}/public-files`, {
//       method: "GET",
//     });

//     const files = (await res.json()) as {
//       modelName: string;
//       fileName: string;
//       companyName: string;
//     }[];

//     const filteredFiles = files.filter((file) => file.companyName !== "shared");

//     usePublicModelsDataStore.setState({ files: filteredFiles });

//     return;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const openPublicFile = async (fileName: string, companyName: string) => {
//   if (fileName === "" || companyName === "") {
//     return;
//   }

//   try {
//     const res = await fetch(
//       `${baseUrl}/models/${companyName}/${fileName}.json`,
//       {
//         method: "GET",
//       }
//     );

//     const data = await res.text();

//     const localDEMOModel: DEMOModelJSON = JSON.parse(data);
//     setNodes(localDEMOModel.nodes);
//     setEdges(localDEMOModel.edges);
//     setEnabled(localDEMOModel.isEnabled);
//     setFileName(localDEMOModel.fileName);

//     setTimeout(() => {
//       saveModel();
//       document.getElementById("fit-view-button")?.click();
//     }, 500);

//     return;
//   } catch (err) {
//     console.error(err);
//   }
// };
