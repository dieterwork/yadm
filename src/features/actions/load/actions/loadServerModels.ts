const loadServerModels = async (): Promise<any> => {
  const email = localStorage.getItem("yadm-user-email") || "";
  const authKey = localStorage.getItem("yadm-auth-key") || "";

  if (!email) {
    throw new Error("Email not found");
  }

  if (!authKey) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/files`, {
    method: "GET",
    headers: {
      Authorization: "Digest " + authKey,
      "X-Email": email,
    },
  });

  if (!res.ok) {
    throw new Error("Fetch error");
  }

  return res.json();
};

export default loadServerModels;
