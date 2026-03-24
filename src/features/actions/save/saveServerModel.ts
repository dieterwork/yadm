import type { DEMOModelJSON } from "../../../shared/types/reactFlow.types";

const saveServerModel = async (model: DEMOModelJSON) => {
  const jsonModel = JSON.stringify(model);

  const email = localStorage.getItem("yadm-user-email") || "";
  const authKey = localStorage.getItem("yadm-auth-key") || "";
  const pwd = localStorage.getItem("yadm-pwd") || "";

  const url = new URL(
    `${import.meta.env.VITE_API_URL}/files/${model.fileName}/data`
  );

  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Digest " + authKey,
      "X-Email": email,
      "X-Pwd": pwd,
    },
    body: jsonModel,
  });
};

export default saveServerModel;
