const sendCodeToEmail = async (email: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });

  if (!res.ok) {
    throw new Error("Fetch error");
  }

  const data = await res.json();

  if (!data.ok) {
    throw new Error("Invalid account");
  }

  return data;
};

export default sendCodeToEmail;
