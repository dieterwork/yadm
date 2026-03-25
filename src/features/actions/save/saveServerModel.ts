import { AppError } from "$/shared/utils/AppError";
import type { DEMOModelJSON } from "../../../shared/types/reactFlow.types";

const saveServerModel = async (model: DEMOModelJSON) => {
  const jsonModel = JSON.stringify(model);

  console.log(model);

  const email = localStorage.getItem("yadm-user-email") || "";
  const authKey = localStorage.getItem("yadm-auth-key") || "";
  const pwd = localStorage.getItem("yadm-pwd") || "";

  const url = new URL(
    `${import.meta.env.VITE_API_URL}/files/${model.fileName}/data`
  );

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Digest " + authKey,
      "X-Email": email,
      "X-Pwd": pwd,
    },
    body: jsonModel,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new AppError("Unauthorized", 401, "Invalid password", true);
    } else {
      throw new AppError("Fetch failed", 400, "Unknown reason", true);
    }
  }

  return true;
};

export default saveServerModel;
