const loadServerModel = async (fileName: string) => {
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
    throw new Error("Fetch error");
  }

  return res.json();
};

export default loadServerModel;
