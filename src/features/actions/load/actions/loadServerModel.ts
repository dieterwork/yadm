import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { AppError } from "$/shared/utils/AppError";

const loadServerModel = async (fileName: string): Promise<DEMOModelJSON> => {
  const email = localStorage.getItem("yadm-user-email") || "";
  const authKey = localStorage.getItem("yadm-auth-key") || "";
  const pwd = localStorage.getItem("yadm-pwd") || "";

  const url = new URL(`${import.meta.env.VITE_API_URL}/files/${fileName}/data`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Digest " + authKey,
      "X-Email": email,
      "X-Pwd": pwd,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new AppError("Unauthorized", 401, "Invalid password", true);
    } else {
      throw new AppError("Fetch failed", 400, "Unknown reason", true);
    }
  }

  return res.json();
};

export default loadServerModel;
