const loadServerModel = async (fileName: string) => {
  const email = localStorage.getItem("yadm-user-email") || "";
  const authKey = localStorage.getItem("yadm-auth-key") || "";
  const pwd = localStorage.getItem("yadm-pwd") || "";

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/files/${fileName}/data`,
    {
      method: "GET",
      headers: {
        Authorization: "Digest " + authKey,
        "X-Email": email,
        "X-Pwd": pwd,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Fetch error");
  }

  return res.json();
};

export default loadServerModel;
